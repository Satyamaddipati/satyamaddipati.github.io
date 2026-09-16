/* Dependency-free menu regression checks. Browser layout is checked separately. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8');
function setup() {
  function element() {
    const classes = new Set();
    return {
      events: {}, attrs: {}, hidden: true,
      classList: { add: c => classes.add(c), remove: c => classes.delete(c),
        toggle: (c, on) => on ? classes.add(c) : classes.delete(c), contains: c => classes.has(c) },
      addEventListener(name, fn) { this.events[name] = fn; },
      setAttribute(name, value) { this.attrs[name] = value; },
      getAttribute(name) { return this.attrs[name]; },
      focus() { this.focused = true; }
    };
  }
  const header = element(), button = element(), nav = element(), section = element(), year = {};
  header.contains = target => target === button;
  const document = element();
  document.querySelector = s => s === '.site-header' ? header : button;
  document.getElementById = id => ({ 'main-nav': nav, projects: section, year })[id];
  const media = element();
  vm.runInNewContext(source, { document, window: { location: { pathname: '/' }, matchMedia: () => media } });
  return { header, button, nav, section, year, media, document };
}
test('menu opens, Escape closes it and restores focus', () => {
  const e = setup();
  assert.equal(e.button.hidden, false);
  e.button.events.click();
  assert.equal(e.button.attrs['aria-expanded'], 'true');
  assert.equal(e.header.classList.contains('menu-open'), true);
  e.header.events.keydown({ key: 'Escape' });
  assert.equal(e.button.attrs['aria-expanded'], 'false');
  assert.equal(e.button.focused, true);
});
test('same-page selection closes the menu and moves focus to the section', () => {
  const e = setup();
  e.button.events.click();
  e.nav.events.click({ target: { closest: () => ({ hash: '#projects', pathname: '/' }) } });
  assert.equal(e.header.classList.contains('menu-open'), false);
  assert.equal(e.section.focused, true);
  assert.equal(e.section.attrs.tabindex, '-1');
});
test('outside click and switching to desktop clear the open menu state', () => {
  const e = setup();
  e.button.events.click();
  e.document.events.click({ target: {} });
  assert.equal(e.button.attrs['aria-expanded'], 'false');
  e.button.events.click();
  e.media.events.change();
  assert.equal(e.header.classList.contains('menu-open'), false);
  assert.equal(e.year.textContent, new Date().getFullYear());
});
