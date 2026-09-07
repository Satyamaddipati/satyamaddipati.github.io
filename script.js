document.documentElement.classList.add("js");

const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("satya-theme");

if (storedTheme) {
  root.dataset.theme = storedTheme;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.dataset.theme = "dark";
}

function updateThemeLabel() {
  if (!themeButton) return;
  const isDark = root.dataset.theme === "dark";
  themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeButton.querySelector("span").textContent = isDark ? "☀" : "◐";
}

updateThemeLabel();

themeButton?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("satya-theme", root.dataset.theme);
  updateThemeLabel();
});

const navLinks = [...document.querySelectorAll("nav a[href^='#']")];
const sections = [...document.querySelectorAll(".observed-section")];

const sectionObserver = new IntersectionObserver(
  entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach(link => {
      const selected = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("active", selected);
      if (selected) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },
  { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.4] }
);

sections.forEach(section => sectionObserver.observe(section));

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const progress = document.querySelector(".scroll-progress");
const backToTop = document.querySelector(".back-to-top");

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progress) progress.style.width = `${percentage}%`;
  backToTop?.classList.toggle("visible", window.scrollY > 650);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();
