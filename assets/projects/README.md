# Real project images

The four small hand-authored sketches and reported-result visuals are explicitly
labeled. They are illustrations, not product screenshots. No screenshot images
have been invented. To add a real screenshot, replace the matching `.project-art`
inside its `.project-figure` in `index.html`, then update the caption:

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
