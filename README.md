# Satya Maddipati’s portfolio

A static editorial personal site: HTML, CSS, and a small vanilla JavaScript menu.
No build step, runtime dependencies, external fonts, or stock photography.

## Preview

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. Root-relative paths target the existing GitHub Pages
user site. Nothing is automatically deployed.

## Structure and design

- `index.html`: introduction, Fall 2026 notebook, selected work, chronology,
  education, unpublished note ideas, life, About, and contact.
- `styles.css`: warm paper, ocean-blue accents, local serif headings, sans-serif
  prose, and monospace metadata. Responsive layouts at 600/800/1050px.
- `script.js`: accessible mobile menu and copyright year. No fetches or trackers.
- `about/`, `blog/`, `resume/`: preserved supporting routes and shared navigation.
- `resume/content.json`: existing factual reference, unchanged.
- `profile.jpg`: original portrait, unchanged.
- `.nojekyll`: preserved.

Reason-Guessr leads with an original inline SVG contour illustration, explicitly
labeled as conceptual rather than model output. Secondary work uses different
text-led compositions. Education explains the transition from Environmental
Science and Engineering into computer science. All technical descriptions are
visible without expanding controls.

The site is intentionally light, with a dark education section. System dark-mode
preferences do not override the palette. Reduced motion disables smooth scrolling
and transitions. Nothing is hidden behind animations. With JavaScript disabled,
all content and navigation remain available.

## Content still to supply

- One personal photograph in the marked `.life-photo-slot`; see
  `assets/life/README.md`. No personal photos or locations were fabricated.
- Real published notes: `blog/` currently has no articles. Homepage concepts are
  marked Exploring, without dates or article links. See `blog/README.md`.
- Verified source links for the projects, and any additional actual demos.
  Reason-Guessr’s existing live URL is preserved.
- The supplied résumé is available at `/resume/resume.pdf`; see below.

## Final résumé

The existing `resume/satya-maddipati-resume.pdf` is documented in the original
repository as a generated draft. It is unchanged and remains unlinked. The file
would still be reachable at its old direct URL if the branch were published.

The owner-supplied final PDF is `resume/resume.pdf`, served unchanged. After
replacing it with an updated résumé, run:

```sh
python3 scripts/build_resume.py
```

This existing utility activates static links and download controls after checking
the PDF signature. It does not generate or alter a PDF. Without a final PDF, all
resume links lead to the readable background page at `/resume/`. No browser-side
availability fetch is needed; rerun the utility whenever the final file changes.

## Factual integrity

The current repository and the owner’s brief supply the content. Existing email,
GitHub, LinkedIn, Reason-Guessr URL, dates, grades, roles, and project technologies
are preserved. The portrait caption does not assume where the photograph was taken.

Tata AIA roles remain Management Trainee (July 2023–June 2024) and Assistant
Manager, Data Science (June 2024–December 2025) on the supporting pages. Homepage
dates remain 2023–2025; no claim is made that employment ended before graduate
school began. Multi-Agent LLM Evaluation remains professional work at Tata AIA.

The prior README recorded historical differences: an older grounded-agent entry
used LLaVA-1.5 with a planner-executor loop, while the current site and reference
use LLaVA-1.6 and Observe–Reason–Act. Older forecasting material said 3–5 days;
the current site/reference says 3–7 days. This redesign preserves the current
values without asserting that the historical versions were the same project.
No new benchmarks, datasets, model sizes, or results were inferred.

## Checks and review

```sh
python3 scripts/check_site.py
node --check script.js
node --test scripts/check_behavior.cjs
git diff --check
```

Static checks cover all HTML pages, local paths/fragments, duplicate IDs, image
alternatives, element nesting, and normal-text palette contrast. Menu regression
checks cover Escape, destination focus, outside clicks, and viewport changes.

Before merging, review all four pages on desktop and a real phone; check external
destinations, portrait crop, copy and historic research details, and the clearly
marked missing photo and the uploaded résumé. Browser review should include 375, 768, 1024,
and 1440px, keyboard navigation, reduced motion, and JavaScript disabled.

Work is on `redesign/editorial-portfolio`. Do not merge or deploy automatically.

### Redesign verification

An isolated Chromium browser checked all four pages at 375, 768, 1024, and 1440px
without horizontal overflow. Full-page and viewport screenshots were reviewed.
Keyboard skip navigation, mobile menu, Escape, focus at anchor destinations,
sticky-header offsets, reduced motion, and navigation without JavaScript passed.
No browser console errors or failed local requests were observed. The minimum
normal-text contrast is 4.78:1 on paper and 9.68:1 in the education section.

Reason-Guessr and GitHub returned HTTP 200. LinkedIn returned HTTP 999 to the
automated check; its original URL is preserved and needs a manual browser check.
