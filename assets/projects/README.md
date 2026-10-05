# Project imagery

All four homepage project diagrams are original inline SVG illustrations,
labeled as concepts rather than screenshots or actual product UI:

- `search-distillation.svg` — teacher/student retrieval diagram
- `reason-guessr.svg` — CLIP encoder → embedding → cue fusion → coordinate regression
- `ai-life-logger.svg` — Ray-Ban capture → Whisper → Claude → SQLite → Telegram
- `llm-evaluation.svg` — model outputs → evaluator agents → aggregation → dashboard

To replace any of these with a real screenshot, swap the `<img>` source in
`index.html` (or the relevant `/projects/*/index.html` case study) for
something like:

```html
<img src="/assets/projects/reason-guessr.webp" width="1200" height="900"
     loading="lazy" decoding="async" alt="Describe the actual input and prediction">
```

Use actual dimensions and a small file, and update the alt text and caption.
All four diagrams share one palette (`#e8e7df` background, `#f8f6f0`/`#dcebf0`
boxes, `#126782` accent, `#15242c` dark boxes) so a future real screenshot
should either match that palette or intentionally break from it, not drift
accidentally. Real project or campus photographs can replace these areas
when supplied by the owner.
