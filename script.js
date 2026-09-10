/* Progressive enhancements only: every page is readable without JavaScript. */
(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const systemTheme = window.matchMedia?.("(prefers-color-scheme: dark)");
  let savedTheme;
  try { savedTheme = localStorage.getItem("satya-theme"); } catch { /* Storage is optional. */ }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    if (themeButton) {
      themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
      const icon = themeButton.querySelector("span");
      if (icon) icon.textContent = dark ? "☀" : "◐";
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#132831" : "#f7f7f2");
  }

  applyTheme(savedTheme === "light" || savedTheme === "dark"
    ? savedTheme : systemTheme?.matches ? "dark" : "light");
  if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener("click", () => {
      savedTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(savedTheme);
      try { localStorage.setItem("satya-theme", savedTheme); } catch { /* Keep it for this visit. */ }
    });
  }
  systemTheme?.addEventListener?.("change", event => {
    if (savedTheme !== "light" && savedTheme !== "dark") applyTheme(event.matches ? "dark" : "light");
  });

  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const sections = navLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
  const header = document.querySelector(".site-header");
  function updateActiveSection() {
    if (!sections.length) return;
    const offset = (header?.getBoundingClientRect().height || 80) + 36;
    let active;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) active = section;
    }
    if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) active = sections[sections.length - 1];
    for (const link of navLinks) {
      if (link.hash === `#${active?.id}`) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }
  // requestAnimationFrame is optional; section state also works without it.
  let framePending = false;
  function scheduleNavigation() {
    if (framePending) return;
    if (!window.requestAnimationFrame) { updateActiveSection(); return; }
    framePending = true;
    window.requestAnimationFrame(() => { framePending = false; updateActiveSection(); });
  }
  if (sections.length) {
    window.addEventListener("scroll", scheduleNavigation, { passive: true });
    window.addEventListener("resize", scheduleNavigation);
    window.addEventListener("hashchange", scheduleNavigation);
    window.addEventListener("pageshow", scheduleNavigation);
    updateActiveSection();
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

/* Only expose the final PDF after verifying the actual file, never a draft. */
(async () => {
  if (!window.fetch) return;
  const url = '/assets/resume/Satya_Maddipati_Resume.pdf';
  try {
    const response = await window.fetch(url, { cache: 'no-store' });
    if (!response.ok) return;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (String.fromCharCode(...bytes.slice(0, 5)) !== '%PDF-') return;
    document.querySelectorAll('[data-resume-link]').forEach(link => {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
    });
    const actions = document.getElementById('resume-downloads');
    if (actions && !actions.children.length) {
      for (const download of [false, true]) {
        const link = document.createElement('a');
        link.className = download ? 'button' : 'button button-solid';
        link.href = url;
        link.textContent = download ? 'Download résumé ↓' : 'Open résumé ↗';
        if (download) link.download = 'Satya_Maddipati_Resume.pdf';
        else { link.target = '_blank'; link.rel = 'noopener'; }
        actions.append(link);
      }
      actions.hidden = false;
      document.getElementById('resume-status').textContent = 'My résumé, ready to read or download.';
    }
  } catch { /* The HTML background page remains useful offline or on failure. */ }
})();

/* A single, finite wave on touch; content and navigation never depend on it. */
(() => {
  const shore = document.querySelector('.hero-status');
  const motion = window.matchMedia?.('(prefers-reduced-motion: no-preference)');
  if (!shore || !motion) return;
  shore.addEventListener('pointerdown', () => {
    if (motion.matches) shore.classList.add('is-rippling');
  }, { passive: true });
  shore.addEventListener('animationend', () => shore.classList.remove('is-rippling'));
  motion.addEventListener?.('change', () => shore.classList.remove('is-rippling'));
})();
