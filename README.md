# Satya Maddipati’s portfolio

Plain HTML, CSS, and vanilla JavaScript for GitHub Pages. No dependencies, build
step, external fonts, or third-party scripts. Existing user edits were preserved
and improved in place; no commit, push, or deployment was performed.

## Preview and check

```sh
python3 -m http.server 8000 --bind 127.0.0.1
node --check theme.js
node --check script.js
node --test scripts/check_behavior.cjs
python3 scripts/check_site.py
git diff --check
```

Open http://127.0.0.1:8000. Root-relative assets assume a GitHub Pages user site.
The existing `.nojekyll`, canonical URLs, portrait, contact links, skip link,
responsive navigation, theme initialization, and scroll tracking are retained.

## Content and design

- `index.html`: student/learner/builder hero, four projects in an open two-column
  layout, native expandable technical notes, Fall 2026 learning, concise
  experience, standalone education, About and small real-photo slots.
- `styles.css`: warm off-white, navy, coastal blue and muted aqua; system sans,
  local serif headings with italic emphasis, small handwritten-style captions,
  a photo-print portrait, restrained sketches, thin borders, and both themes.
  The font stacks use local fallbacks and make no network requests.
- `script.js`: theme, active navigation, year, final-PDF detection, touch wave.
- `theme.js`: existing storage-safe initialization before first paint.
- `about/index.html`, `blog/index.html`, `resume/index.html`: existing subpages,
  with consistent navigation and palette. Notes remains out of the main menu.
- `resume/content.json`: background reference, manually maintained. It is not a
  final résumé and is no longer used to generate a substitute PDF.
- `assets/projects/README.md`, `assets/life/README.md`: real-image instructions.

The one ocean interaction is a tiny line wave beside the hero notebook note.
Hover or touch causes one finite 1.8-second movement, with no animation loop,
canvas, dependency, or text obstruction. The tilted photo prints and line
illustrations are static. Touch continuation is optional JS.
Reduced motion disables it and smooth scrolling/transitions; no content is ever
hidden behind animation. Without JavaScript, content and anchor navigation work.
Blocked local storage does not prevent theme switching. Technical notes use
native `<details>` and remain keyboard-operable even without JavaScript.

Fall 2026 contains exactly the four supplied course/interests, presented as an
editorial two-column grid that stacks on phones. No invented course numbers,
instructors, grades, or scheduling details. Previous subjects are secondary.
Education gives equal columns to UW–Madison and IIT Bombay, stacking on phones.

## Final résumé

Supply `assets/resume/Satya_Maddipati_Resume.pdf`, then run:

```sh
python3 scripts/build_resume.py
```

Despite its legacy filename, this utility only activates/deactivates links. It
never generates a PDF. Running it makes final open/download links work without
JavaScript too. With JS, a successful fetch and `%PDF-` signature activate the
same links automatically. Otherwise `/resume/` offers an honest availability
message and readable background. Open links use a new tab; the résumé page also
has a download link once the file exists.

Neither supplied dummy PDF was copied into the repository or linked. The
pre-existing `resume/satya-maddipati-resume.pdf` remains unmodified and unlinked;
it is a generated draft, not the final résumé. Its direct path would still be
accessible if this tree were published. Archive/remove it before future
publication if that old URL should disappear.

## Factual sources and differences

Working résumé PDFs may be used as reference material, but factual conflicts
should be resolved against verified source content rather than assuming the PDFs
are authoritative. The owner’s explicit corrections govern employment history.

- Tata AIA Life Insurance: Management Trainee, July 2023–June 2024; Assistant
  Manager, Data Science, June 2024–December 2025. Final working period ended in
  December 2025. Homepage shorthand: Data Science · 2023–2025.
- The Multi-Agent LLM Evaluation Platform is professional work at Tata AIA.
  Selected Work labels it “Production work · Tata AIA”; About, the résumé page,
  and reference JSON use the same attribution.
- Restored from pre-existing `HEAD:index.html` and `HEAD:resume/content.json`:
  50K+ evaluations/month, 89% correlation with human scoring, 35% less manual
  review, an estimated 2,000+ person-hours saved annually, accuracy improved
  from 78% to 94%, and IIT Bombay’s 3–7 day forecasting horizon. Service metrics
  remain 0.8s p95 latency and 99.5% uptime. Metrics are grouped by relevant work.
- Repository history independently supports the audited evaluation details:
  `7d01f7b5^:_projects/3_llm_eval.md` contains 1,000+ prompts (a lower bound,
  not an exact count), GPT-4/Claude/Gemini comparison, and Streamlit.
- `7d01f7b5^:_projects/2_agentic_claims.md` and `_pages/cv.md` independently
  support CrewAI and insurance claims-processing work. These details are kept.
- Removed the grounded-agent 7B parameter count, VisualWebBench, ScienceQA,
  and Mistral-7B + ReAct baseline from the homepage: no independent support was
  found in the repository’s project/page history. These need confirmation
  before being restored.

Remaining historical ambiguities: the older `_projects/1_llava_agent.md` describes
LLaVA-1.5 with a planner-executor loop, while the more recent pre-existing site
uses LLaVA-1.6 and Observe–Reason–Act. Confirm whether these are different versions
or projects. The older `_projects/3_air_quality.md` says 3–5 days, while the recent
site and résumé reference say 3–7 days. The requested 3–7 day horizon is restored
from that recent content; the older discrepancy is recorded here for confirmation.

Education and Fall 2026 subjects remain as explicitly supplied by the owner.
Reason-Guessr’s CLIP/PyTorch, 32K images and 88.9 km metric remain from existing
site content. More specific model/dataset details await implementation evidence.
Life Logger facts remain from the existing site. No additional results were added.

## Assets and links still needed

- Four actual project images: Life Logger transcript/summary, Reason-Guessr
  input/prediction, evaluation comparison, grounded-agent instruction trace.
- Verified source links for all four; demos for the other three if available.
  Missing links remain plain text, never fake buttons or `href="#"`.
- Personal Madison, travel and everyday/fitness photos with real captions.
- The final PDF at the exact path above.

Existing GitHub, LinkedIn and Reason-Guessr URLs are preserved. The web fetcher
could not establish availability (cache/safety/access errors); these are not
confirmed broken. Open them manually and confirm the correct destinations.

## Validation and manual review

Static checks: all four pages, local links/fragments, semantic structure, image
alternatives, JS syntax, theme/storage/navigation regression checks. Minimum
normal-text palette contrast: light 5.04:1, dark 6.38:1.

An isolated local Chromium browser checked 320/375/640/768/1280px with no horizontal
overflow, active section links, both themes, reduced motion, all subpages,
JavaScript disabled, blocked storage, and missing/invalid/present PDF responses.
The present-PDF response was mocked only in the browser; no fake PDF was saved.
Keyboard skip-to-content focus and the finite touch wave also passed.

Review typography and the small wave on your actual phone, including Safari and actual 200% browser zoom;
confirm the historical research ambiguities noted above and external links.
Replace honest placeholders with actual imagery when ready. Recheck résumé
open/download behavior after adding the real final PDF. No publication performed.
