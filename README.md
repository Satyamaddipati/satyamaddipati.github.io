# Satya Maddipati’s portfolio

A static personal site built with HTML, CSS, and a small vanilla JavaScript menu.

## Preview

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. Root-relative paths target the GitHub Pages user site.

## Reference-driven layout

The homepage follows the owner's supplied six-panel reference: serif headings,
warm textured paper, blue buttons, a tilted scenic photograph, handwritten
margin notes, a compact semester notebook, two-column photographic project cards,
a vertical experience timeline, education cards, a photo-and-notes writing section,
and contact buttons followed by four lifestyle cards.

- `index.html`: the six homepage sections.
- `journal.css`: homepage layout and responsive styling, scoped through the
  homepage stylesheet and body class.
- `styles.css`: shared base styles and supporting routes.
- `script.js`: accessible mobile menu and copyright year.
- `about/`, `blog/`, `resume/`: supporting routes, original portrait and
  fuller background.
- `resume/resume.pdf`: owner-supplied final résumé, served unchanged.
- `assets/images/`: local photographs and generated editorial imagery;
  see the asset README for provenance and generation prompts.

The content remains grounded in the existing portfolio, rather than copying
sample dates, degrees, jobs, or unpublished articles from the visual reference.
Project metrics and additional career details are available in native HTML
disclosures, including without JavaScript. Notes are explicitly marked Exploring.
Institution badges are typographic labels, not official seals.

## Content and factual integrity

The actual degrees remain an M.S. in Computer Sciences at UW–Madison (2025–2027,
GPA 4.0/4.0) and an Environmental Science and Engineering dual degree with Honors
at IIT Bombay (2018–2023, GPA 8.9/10).

Tata AIA roles remain Management Trainee (July 2023–June 2024) and Assistant
Manager, Data Science (June 2024–December 2025). Multi-Agent LLM Evaluation remains
professional work at Tata AIA. Grounded-agent and forecasting descriptions
preserve the existing LLaVA-1.6, Observe–Reason–Act, and 3–7 day values.
No new performance claims were added.

The generated photographs are editorial imagery; they are not personal travel
records or screenshots of the projects. Original campus and lake photographs
were already present in the workspace. Real project source links and published
notes can be added when supplied. Existing GitHub, LinkedIn, email, and
Reason-Guessr destinations are preserved.

## Résumé

The original generated draft at `resume/satya-maddipati-resume.pdf` remains
unchanged and unlinked. The final owner-supplied file is `resume/resume.pdf`.
After replacing the final file, run `python3 scripts/build_resume.py` to check its
signature and activate static download controls. It does not generate a PDF.

## Verification

```sh
python3 scripts/check_site.py
node --check script.js
node --test scripts/check_behavior.cjs
git diff --check
```

Checks cover HTML structure, local links and fragments, image alternatives,
palette contrast, and menu behavior. Browser checks cover desktop and mobile
widths, supporting routes, keyboard navigation, anchor focus, reduced motion,
and navigation without JavaScript. Current visual review screenshots are local
temporary files, not deployed assets.

Work is on `redesign/editorial-portfolio`. Nothing is automatically merged or
deployed.
