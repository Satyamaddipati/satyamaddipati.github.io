/* Dependency-free regression checks for the progressive enhancements. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
const initialTheme = fs.readFileSync(path.join(__dirname, '../theme.js'), 'utf8');
function environment({ stored, blocked = false, dark = false, home = true, animation = true, media = true } = {}) {
  const listeners = {};
  const system = { matches: dark, addEventListener: (_, fn) => { listeners.system = fn; } };
  function element() { return { attributes: {}, hidden: true, setAttribute(k,v) { this.attributes[k]=v; }, removeAttribute(k) { delete this.attributes[k]; }, addEventListener(n,fn) { this[n]=fn; } }; }
  const icon = {};
  const theme = element(); theme.querySelector=()=>icon;
  const meta = element(); const year={};
  const root={dataset:{},scrollHeight:4000};
  const tops=[0,900,2100,3100];
  const sections=['about','projects','experience','life'].map((id,i)=>({id,getBoundingClientRect:()=>({top:tops[i]-window.scrollY})}));
  const nav=home?sections.map(s=>Object.assign(element(),{hash:`#${s.id}`})):[];
  const window={innerHeight:800,scrollY:0,addEventListener:(n,fn)=>listeners[n]=fn};
  if(media) window.matchMedia=()=>system;
  if(animation) window.requestAnimationFrame=fn=>{ listeners.frame=fn; };
  const document={documentElement:root,
    querySelector:s=>({'.theme-toggle':theme,'.site-header':{getBoundingClientRect:()=>({height:96})},'meta[name="theme-color"]':meta})[s],
    querySelectorAll:()=>nav,
    getElementById:id=>id==='year'?year:sections.find(s=>s.id===id)};
  const localStorage={getItem(){if(blocked)throw Error('denied');return stored;},setItem(k,v){if(blocked)throw Error('denied');stored=v;}};
  const context=vm.createContext({document,window,localStorage});
  vm.runInContext(initialTheme,context);
  vm.runInContext(source,context);
  return {root,theme,icon,meta,nav,listeners,window,year};
}
test('blocked storage still permits both theme changes and usable controls',()=>{
  const e=environment({blocked:true});
  assert.equal(e.root.dataset.theme,'light'); assert.equal(e.theme.hidden,false);
  e.theme.click(); assert.equal(e.root.dataset.theme,'dark');
  assert.equal(e.meta.attributes.content,'#132831');
  assert.equal(e.theme.attributes['aria-label'],'Switch to light theme');
  e.theme.click(); assert.equal(e.root.dataset.theme,'light');
});
test('valid saved preference overrides OS; invalid preference follows OS',()=>{
  assert.equal(environment({stored:'light',dark:true}).root.dataset.theme,'light');
  assert.equal(environment({stored:'garbage',dark:true}).root.dataset.theme,'dark');
  const e=environment({dark:true}); e.listeners.system({matches:false});
  assert.equal(e.root.dataset.theme,'light'); e.theme.click();
  e.listeners.system({matches:false}); assert.equal(e.root.dataset.theme,'dark');
});
test('active section follows scrolling, gaps, footer and return to top',()=>{
  const e=environment();
  function current(){return e.nav.filter(n=>n.attributes['aria-current']).map(n=>n.hash);}
  assert.deepEqual(current(),['#about']);
  e.window.scrollY=900; e.listeners.scroll(); e.listeners.frame(); assert.deepEqual(current(),['#projects']);
  e.window.scrollY=1850; e.listeners.scroll(); e.listeners.frame(); assert.deepEqual(current(),['#projects']);
  e.window.scrollY=2200; e.listeners.hashchange(); e.listeners.frame(); assert.deepEqual(current(),['#experience']);
  e.window.scrollY=3200; e.listeners.scroll(); e.listeners.frame(); assert.deepEqual(current(),['#life']);
  e.window.scrollY=0; e.listeners.pageshow(); e.listeners.frame(); assert.deepEqual(current(),['#about']);
});
test('no animation APIs, IntersectionObserver or matchMedia are required',()=>{
  const e=environment({animation:false,media:false});
  e.window.scrollY=2100; e.listeners.scroll();
  assert.equal(e.nav[2].attributes['aria-current'],'location');
  assert.equal(e.root.dataset.theme,'light');
});
test('subpages keep page navigation and the shared theme usable',()=>{
  const e=environment({home:false});
  assert.equal(e.listeners.scroll,undefined); e.theme.click();
  assert.equal(e.root.dataset.theme,'dark');
  assert.equal(e.year.textContent,new Date().getFullYear());
});
