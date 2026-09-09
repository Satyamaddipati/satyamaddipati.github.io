# Satya Maddipati's portfolio

A personal software and applied AI portfolio built with HTML, CSS, and vanilla
JavaScript. Designed for GitHub Pages at https://satyamaddipati.github.io/.
No framework, npm, site build step, external fonts, or third-party scripts.

## Preview locally

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. Stop the server with Ctrl+C.
Use HTTP rather than opening the HTML file directly: assets use root-relative paths.

## File guide

| File | Purpose |
| --- | --- |
| `index.html` | Introduction, current interests, selected projects, concise experience, education, Life |
| `styles.css` | Shared design tokens, layouts, responsive rules, light/dark themes, print styles |
| `theme.js` | Small, early theme initialization to avoid a flash of the wrong theme |
| `script.js` | Optional theme controls, active section navigation, hello interaction, year |
| `profile.jpg` | Existing portrait and social sharing image |
| `assets/favicon.svg` | Small custom initial mark |
| `assets/projects/README.md` | Screenshot locations and replacement instructions |
| `assets/life/README.md` | Guidance for adding real personal photos |
| `blog/index.html` | Real journal index, currently with no published entries |
| `blog/README.md` | How to add a real post or photo collection |
| `resume/index.html` | Accessible HTML résumé with download and view links |
| `resume/content.json` | Shared facts for the résumé page and PDF |
| `resume/satya-maddipati-resume.pdf` | Generated, one-page résumé with selectable text and clickable links |
| `scripts/build_resume.py` | Optional résumé maintenance tool; requires ReportLab |
| `scripts/check_site.py` | Standard-library HTML, local link, and palette checks |
| `scripts/check_behavior.cjs` | Dependency-free JavaScript behavior checks |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |

## Design and behavior

Warm paper, forest green, system typography, fine borders, a small portrait mount,
and editorial spacing. Dark mode uses muted green and charcoal. Projects have
visible summaries; the smaller research project uses native `<details>`.

The theme follows the device until the visitor chooses a preference. Blocked
storage does not prevent theme switching. Content is visible without JavaScript;
script-only controls are hidden until initialized. No animation API is needed.
Reduced-motion preferences disable smooth scrolling and transitions.

The navigation uses a compact two-row layout on phones so the theme control and
section links remain available. The homepage retains `#about`, `#projects`,
`#experience`, `#education`, `#life`, and `#contact` anchors.

Shared navigation and footer markup intentionally lives in each HTML page. Keep
these three copies consistent when editing; no client-side includes are required.

## Update content

Edit homepage text in `index.html`. Update the “On my desk” date when its content
changes. Keep production claims traceable to your own work.

The project visuals are labeled concept/pipeline sketches and reported results,
not fabricated screenshots. Missing links are plain text, never fake buttons.
See `assets/projects/README.md` to replace the sketches with actual images.

For the résumé, edit `resume/content.json`, then regenerate both outputs:

```sh
python3 -m venv /tmp/satya-resume-env
/tmp/satya-resume-env/bin/pip install reportlab
/tmp/satya-resume-env/bin/python scripts/build_resume.py
```

This tool is only needed when changing the résumé. GitHub Pages serves the
committed HTML and PDF directly. The marked content region of `resume/index.html`
is generated; its page header, navigation, and footer can be edited normally.
Reopen the PDF after regeneration to confirm page count, spacing, links, and text.
Homepage summaries are edited separately; keep the facts consistent with the résumé.

## Content still to supply

- Actual screenshots for Reason-Guessr, Ray-Ban AI Life Logger, and LLM Evaluation.
- Verified project source URLs, plus a Life Logger demo if there is one.
- Any shareable visual or source link for the production evaluation work.
- Your own photos, captions, and real journal posts. No sample posts are published.
- Review the generated résumé before using it for applications. It reuses repository
  facts and the Ray-Ban project name supplied in the redesign brief.
- Verify the original dates and metrics. Tata AIA's July 2023–December 2025 dates
  overlap the September 2025 start of UW–Madison; this was preserved, not guessed away.

## Checks

```sh
node --check theme.js
node --check script.js
node --test scripts/check_behavior.cjs
python3 scripts/check_site.py
git diff --check
```

The behavior tests cover blocked storage, theme fallback, OS preference changes,
section navigation, missing animation/media APIs, subpages, and the hello control.
Static checks validate page structure, IDs, local references, and normal-text
contrast. Minimum tested palette contrast: light 4.80:1; dark 6.25:1.
These tests do not replace a browser accessibility audit.

The local homepage, journal, résumé page, and PDF returned HTTP 200. The PDF was
rendered and visually checked. Browser visual/responsive testing remains pending:
the available browser/native automation connection could not start.
External link availability could not be established with the available web fetcher;
the existing GitHub, LinkedIn, and Reason-Guessr URLs were preserved.

## Before publishing to GitHub Pages

1. Review the copy, metrics, dates, and generated PDF. Add the missing assets/links
   above or consciously keep their honest “coming soon” labels.
2. Run the checks. Preview `/`, `/blog/`, `/resume/`, and the PDF locally.
3. Test at 320/375px phone, 768px tablet, and 1280px desktop widths in a browser,
   plus 200% zoom. Check for overflow and readable project diagrams/captions.
4. Use Tab/Shift+Tab: verify skip link focus, visible focus outlines, native project
   disclosure, theme switching, navigation, and the résumé download. Test both
   themes, reduced motion, JavaScript disabled, and storage blocked.
5. Open GitHub, LinkedIn, and the live Reason-Guessr project to check their current
   destinations. Verify email uses your preferred address.
6. Review `git diff`, then commit/push only when ready. In GitHub's repository
   Settings → Pages, confirm the chosen publishing branch uses the repository root.
   This checkout contains no deployment workflow. Preserve `.nojekyll`.
7. After deployment, check the public pages and PDF again. Update canonical/social
   URLs if you change the domain; root-relative assets assume a user site/domain root.

