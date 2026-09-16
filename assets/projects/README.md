# Project imagery

Reason-Guessr uses an original inline SVG contour illustration, labeled as a
concept rather than a screenshot or actual prediction. To replace it with a real
screenshot, replace `.geo-art` inside `.geo-figure` in `index.html`:

```html
<img src="/assets/projects/reason-guessr.webp" width="1200" height="900"
     loading="lazy" decoding="async" alt="Describe the actual input and prediction">
```

Use actual dimensions and a small file, and update the caption. Life Logger has
a simple text flow, evaluation has existing reported numbers, and the agent
experiment is text-led. No screenshots, personal photographs, or URLs were invented.
