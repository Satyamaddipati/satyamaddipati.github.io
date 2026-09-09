/* Apply the saved preference before first paint. Storage is optional. */
(() => {
  let theme;
  try { theme = localStorage.getItem("satya-theme"); } catch { /* Privacy mode. */ }
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
})();
