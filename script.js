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
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#1b211e" : "#f6f5ef");
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
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) active = section;
    }
    if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) active = sections[sections.length - 1];
    for (const link of navLinks) {
      if (link.hash === `#${active.id}`) link.setAttribute("aria-current", "location");
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

  const helloButton = document.querySelector(".hello-button");
  const helloResponse = document.querySelector(".hello-response");
  if (helloButton && helloResponse) {
    helloButton.hidden = false;
    helloButton.addEventListener("click", () => {
      helloResponse.textContent = "hello back! :)";
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
