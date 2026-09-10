# Real project images

The existing hand-authored pipeline/concept sketches remain explicitly labeled.
No product screenshots have been invented. Replace the matching `.asset-slot`
in `index.html` with a real image, preserving the figure and updating its caption:

```html
<img class="project-image" src="/assets/projects/reason-guessr.webp"
     width="1200" height="750" loading="lazy" decoding="async"
     alt="Describe the actual input and prediction shown">
```

Use actual dimensions, descriptive alt text, and preferably files under 200 KB.

- `life-logger.webp`: a real transcript and hourly summary; redact private content.
- `reason-guessr.webp`: actual input photo beside its prediction/results.
- `llm-evaluation.webp`: a real comparison/evaluation view.
- `grounded-agents.webp`: one real Observe–Reason–Act instruction trace.

Verified source URLs are missing for all four projects. Only Reason-Guessr has an
existing demo URL. Replace plain missing-link notes once real URLs are supplied.
