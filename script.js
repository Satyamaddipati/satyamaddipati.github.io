/* Progressive enhancement: navigation works with JavaScript disabled. */
(() => {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  if (header && button && nav) {
    function closeMenu(returnFocus = false) {
      header.classList.remove('menu-open');
      button.setAttribute('aria-expanded', 'false');
      if (returnFocus) button.focus();
    }
    button.hidden = false;
    header.classList.add('menu-ready');
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      header.classList.toggle('menu-open', open);
    });
    nav.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      closeMenu();
      // Keep keyboard focus at the destination after closing a same-page menu.
      if (link.hash && link.pathname === window.location.pathname) {
        const target = document.getElementById(link.hash.slice(1));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
    header.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) closeMenu();
    });
    window.matchMedia('(min-width: 601px)').addEventListener('change', () => closeMenu());
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
