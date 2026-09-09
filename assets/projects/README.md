# Real project images

No project screenshots were supplied. The homepage uses explicitly labeled,
hand-authored concept sketches or existing reported metrics, with a screenshot
placeholder caption. These are not screenshots of working interfaces.

Suggested files (add the real assets before referencing them):

- `reason-guessr.webp`
- `life-logger.webp`
- `llm-evaluation.webp`

Search `index.html` for `SCREENSHOT` to find each replacement point. Replace the
whole `.project-visual` element inside the corresponding `.project-figure` with:

```html
<img class="project-image" src="/assets/projects/reason-guessr.webp"
     width="1200" height="750" loading="lazy" decoding="async"
     alt="Describe what the actual screenshot shows">
```

Use the image's real width/height, a descriptive alt, and a concise real caption
instead of “Project screenshot coming soon.” The shared CSS displays images using
`object-fit: contain` so UI edges are not cropped. Aim for under 200 KB per image
when possible. Only use screenshots you can share publicly.

Replace the relevant `.pending-link` text with a normal `<a>` when you have the
verified source/demo URL. Don't assume a repository name or use `href="#"`.
