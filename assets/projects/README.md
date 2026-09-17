# Project imagery

Reason-Guessr uses an original inline SVG contour illustration, labeled as a
concept rather than a screenshot or actual prediction. To replace it with a real
screenshot, replace `.geo-art` inside `.geo-figure` in `index.html`:

```html
<img src="/assets/projects/reason-guessr.webp" width="1200" height="900"
     loading="lazy" decoding="async" alt="Describe the actual input and prediction">
```

Use actual dimensions and a small file, and update the caption. Life Logger has
a simple notebook illustration and audio flow; evaluation and the agent experiment
have typographic diagrams. All are illustrative, not actual product screenshots.
The university panels are typography, not official university logos. Real project
or campus photographs can replace these areas when supplied by the owner.
