/* Browser validation only. No real geolocation or provider authentication. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const base = process.env.SITE_URL || 'http://127.0.0.1:8000';
const output = fs.mkdtempSync(path.join(os.tmpdir(), 'life-lately-'));

(async () => {
  const workouts = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/workouts.json')));
  const music = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/music.json')));
  assert.deepEqual(workouts.activities, []);
  assert(Object.values(workouts.summary).every(v => v === null));
  assert.equal(music.current, null);
  assert.deepEqual(music.recent, []);
  const browser = await chromium.launch({
    headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {})
  });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, timezoneId: 'America/Chicago', reducedMotion: 'reduce' });
    await context.addInitScript(() => {
      window.geoCalls = 0;
      Object.defineProperty(navigator, 'geolocation', { value: {
        getCurrentPosition(success, error) {
          window.geoCalls++;
          if (window.mockGeoSuccess) success({coords:{latitude:43.073051,longitude:-89.40123}});
          else error({code:1});
        }
      }, configurable:true });
    });
    const page = await context.newPage();
    const errors = [];
    const requests = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => requests.push(r.url()));
    await page.clock.install({ time: new Date('2026-09-17T05:31:00Z') });
    for (const mode of ['demo', 'empty']) {
      await page.goto(base + '/' + (mode === 'demo' ? '?demo=1' : '') + '#life-lately');
      await page.waitForFunction(() => document.querySelector('#visitor-time').dateTime);
      if (mode === 'demo') await page.locator('.workout-row').first().waitFor();
      await page.waitForFunction(() => document.querySelector('#life-lately').dataset.ready === 'true');
      if (mode === 'demo') await page.locator('.music-current').waitFor();
      await page.evaluate(async () => {
        for (const img of document.querySelectorAll('#life-lately img')) await img.decode();
      });
      assert.equal(await page.evaluate(() => window.geoCalls), 0);
      if (mode === 'empty') {
        assert.equal(await page.locator('.workout-row').count(), 0);
        assert.equal(await page.locator('.music-current').count(), 0);
        assert(await page.locator('#music-content').textContent().then(t => t.includes('coming soon')));
      } else {
        assert.equal(await page.locator('.workout-row').count(), 5);
        assert.equal(await page.locator('.music-recent li').count(), 10);
        assert.equal(await page.locator('.music-current .music-art').evaluate(el=>el.getBoundingClientRect().width),72);
        assert.equal(await page.locator('.music-recent .music-art').first().evaluate(el=>el.getBoundingClientRect().width),44);
        assert((await page.locator('.workout-list').textContent()).includes('325 m'));
        assert((await page.locator('.workout-summary').textContent()).includes('resting hr 54'));
        assert(!(await page.locator('.music-meta').textContent()).includes('now playing'));
        assert(await page.locator('.workout-summary').textContent().then(t => t.includes('sleep 7h 42m')));
      }
      for (const width of [320, 375, 600, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'overflow at ' + width);
      }
      for (const [size, width] of [['desktop',1440], ['mobile',375]]) {
        await page.setViewportSize({width, height:1000});
        await page.locator('#life-lately').screenshot({path:path.join(output, mode + '-' + size + '.png'), style:'.site-header { visibility:hidden; }'});
      }
    }
    assert(!requests.some(url => /open-meteo|strava|last.fm|audioscrobbler|garmin/.test(url)), 'unexpected provider request');
    const clockBefore = await page.locator('#visitor-time').textContent();
    await page.clock.runFor(60_000);
    assert.notEqual(await page.locator('#visitor-time').textContent(), clockBefore);
    assert.equal(await page.locator('#visitor-timezone').textContent(), 'America/Chicago');

    // A denied request is quiet, does not retry, and leaves the clock intact.
    await page.locator('#weather-button').click();
    assert.equal(await page.locator('#weather-status').textContent(), 'weather unavailable');
    await page.locator('#weather-button').dispatchEvent('click');
    assert.equal(await page.evaluate(() => window.geoCalls), 1);
    assert(await page.locator('#visitor-time').isVisible());

    // Weather success is mocked; the actual visitor's location is never requested.
    await page.reload();
    await page.locator('#weather-button').waitFor({state:'visible'});
    await page.evaluate(() => { window.mockGeoSuccess = true; });
    let weatherCalls = 0;
    await page.route('https://api.open-meteo.com/**', route => {
      weatherCalls++;
      const url = new URL(route.request().url());
      assert.equal(url.searchParams.get('latitude'), '43.07');
      assert.equal(url.searchParams.get('longitude'), '-89.40');
      return route.fulfill({json:{current:{temperature_2m:61,apparent_temperature:59,weather_code:0}}});
    });
    await page.locator('#weather-button').click();
    await page.waitForFunction(() => document.querySelector('#weather-status').textContent.includes('61°F'));
    assert.equal(weatherCalls, 1);
    assert.equal(await page.locator('#weather-status').textContent(), '61°F · feels 59°F · clear');
    assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
    assert(!(await page.locator('#life-lately').textContent()).includes('43.07'));
    assert(await page.locator('#weather-credit').isVisible());
    await page.unroute('https://api.open-meteo.com/**');
    await page.route('https://api.open-meteo.com/**', route => route.fulfill({status:503,body:'unavailable'}));
    await page.reload();
    await page.locator('#weather-button').waitFor({state:'visible'});
    await page.evaluate(() => { window.mockGeoSuccess = true; });
    await page.locator('#weather-button').click();
    await page.waitForFunction(() => document.querySelector('#weather-status').textContent === 'weather unavailable');

    // Invalid public data cannot become executable markup or a javascript: link.
    const result = await page.evaluate(async () => {
      const {renderWorkouts} = await import('/assets/js/live/workouts.js');
      const {renderMusic} = await import('/assets/js/live/music.js');
      const {isDemo, duration, relativeTime, publicURL} = await import('/assets/js/live/public-data.js');
      for (const hostname of ['satyamaddipati.github.io', 'portfolio.test', '[::1]', 'localhost.example.com']) {
        if (isDemo({hostname,search:'?demo=1'})) throw new Error('Public demo gate failed');
      }
      for (const hostname of ['localhost', '127.0.0.1']) {
        if (!isDemo({hostname,search:'?demo=1'})) throw new Error('Local demo gate failed');
      }
      const {normalizeWorkouts} = await import('/assets/js/live/providers/workout-provider.js');
      const {normalizeMusic} = await import('/assets/js/live/providers/music-provider.js');
      const target = document.createElement('div');
      const now = Date.parse('2026-09-17T18:00:00Z');
      renderWorkouts(target, normalizeWorkouts({summary:{sleepMinutes:null}, activities:[
        {name:'<img src=x onerror=alert(1)>',type:'run',startedAt:'2026-09-16T18:00:00Z',durationSeconds:2735,distanceMeters:6100,url:'javascript:alert(1)'},
        {title:'invalid',startedAt:'bad',durationSeconds:-1}
      ]}), now);
      const safe = target.querySelectorAll('img,a').length === 0 && target.querySelectorAll('li').length === 1;
      renderMusic(target,normalizeMusic({updatedAt:'2026-09-17T17:00:00Z',current:{title:'A',artist:'B',isPlaying:true,artwork:'javascript:alert(1)'},recent:[]}),now);
      return {
        safe, stale:target.textContent.includes('recently played'), missingArt:!!target.querySelector('.music-art-missing'),
        remoteDemo:isDemo({hostname:'satyamaddipati.github.io',search:'?demo=1'}),
        duration:duration(2735), relative:relativeTime('2026-09-16T18:00:00Z',now),
        unsafe:publicURL('javascript:alert(1)')
      };
    });
    assert.deepEqual(result, {safe:true,stale:true,missingArt:true,remoteDemo:false,duration:'45m 35s',relative:'1d ago',unsafe:null});

    // Broken feeds retain the static fallbacks.
    await page.route('**/assets/data/*.json', route => route.fulfill({status:200,contentType:'application/json',body:'invalid JSON'}));
    await page.goto(base + '/');
    await page.locator('#weather-button').waitFor({state:'visible'});
    assert(await page.locator('#music-content').textContent().then(t => t.includes('coming soon')));
    assert(await page.locator('#workouts-content').textContent().then(t => t.includes('no workouts shared')));

    // A public hostname never requests example data, even with the query flag.
    const publicPage = await context.newPage();
    const publicRequests = [];
    publicPage.on('request', request => publicRequests.push(request.url()));
    await publicPage.route('https://portfolio.test/**', async route => {
      const url = new URL(route.request().url());
      const local = path.join(root, url.pathname === '/' ? 'index.html' : url.pathname);
      const types = {'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg'};
      if (!fs.existsSync(local)) return route.fulfill({status:404,body:''});
      return route.fulfill({body:fs.readFileSync(local),contentType:types[path.extname(local)] || 'application/octet-stream'});
    });
    await publicPage.goto('https://portfolio.test/?demo=1#life-lately');
    await publicPage.locator('#weather-button').waitFor({state:'visible'});
    assert(!publicRequests.some(url => url.includes('.example.json')));
    assert(await publicPage.locator('#lately-demo-label').isHidden());
    assert(publicRequests.some(url => url.endsWith('/assets/data/music.json')));
    const nojs = await browser.newContext({javaScriptEnabled:false});
    const plain = await nojs.newPage();
    await plain.goto(base + '/#life-lately');
    assert(await plain.locator('#music-content').textContent().then(t=>t.includes('coming soon')));
    assert(await plain.locator('#weather-button').isHidden());
    assert.deepEqual(errors, []);
    console.log('PASS: empty production data; demo gating; 320–1440px layout; minute clock; safe rendering; stale music; weather opt-in, denial and failure; no-JS fallbacks.');
    console.log('Screenshots: ' + output);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
