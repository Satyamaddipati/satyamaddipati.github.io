# Pre-commit QA — 2026-09-17

## Result

The site is technically functioning, but image-rights verification is incomplete.
Do not publish the unresolved images until permission is established or they
are replaced. No redesign, provider authentication, commit or push was performed.

| Category | Result | Evidence |
| --- | --- | --- |
| Image rights | FAIL | Two external campus photographs verified; lake photo and portrait rights unresolved |
| Demo isolation | PASS | Only localhost and 127.0.0.1 accept ?demo=1; other hosts use production JSON |
| Empty production data | PASS | Both real JSON files remain empty; restrained text fallbacks; no broken artwork or fake metrics |
| Security | PASS, scoped scan | Current HEAD tracked text and current working-tree files scanned; no credential values found |
| Links | FAIL, incomplete verification | Local routes, anchors, résumé, GitHub and Reason-Guessr pass; LinkedIn blocks automation with HTTP 999 |
| Responsive layout | PASS | 375, 768, 1024, 1440px; no page overflow, clipped visible text, or annotation/text collisions |
| Existing checks | PASS | Static site check, menu tests, JS syntax, résumé activation, subsection/browser checks and whitespace check |

## Image inventory and rights

Verified sources only are credited in assets/IMAGE_CREDITS.md and a small
Image credits disclosure in the homepage footer.

| Local file | Exact known source | Creator | License | Attribution | Publication status |
| --- | --- | --- | --- | --- | --- |
| assets/images/bascom-hall.jpg | https://commons.wikimedia.org/wiki/File:Bascom_Hall_on_the_UW_Madison_campus_in_Madison,_WI_(6351014921).jpg | Richard Hurd; local EXIF says RA Hurd | CC BY 2.0 | Required; added | Verified with source and local image comparison |
| assets/images/iit-bombay-main-building.jpg | https://commons.wikimedia.org/wiki/File:Main_building_in_IIT_Bombay.jpg | Shishirdasika | CC BY-SA 4.0 | Required; added, including adaptation license | Verified with source and local image comparison |
| assets/images/lake-mendota-sunset.jpg | Unknown | Unknown | Unknown | Cannot determine | UNSAFE TO PUBLISH — replace this file or establish its exact source and rights |
| profile.jpg | No external source established; repository history records an upload in commit 7355b8a2 | Photographer unknown | Unknown; no permission record found | Cannot determine | UNSAFE TO PUBLISH under this audit's verification requirement — confirm photographer permission/ownership or replace this file |

The portrait is an existing owner-supplied asset, not confirmed stock photography.
Its upload does not establish who took the photograph or a license. It appears on
About and as social-sharing metadata on all four HTML routes.

The campus comparisons found identical subjects/compositions and very small
JPEG pixel differences at the same dimensions (approximately 1–3/255 per channel).
They are not claimed to be byte-identical originals.

A candidate lake image titled “Lake Mendota sunset 06-21-2015 569 (19208954698)”
was downloaded for comparison and did not match the local photograph. Its creator
and license were therefore not assigned to the site's asset.

Other used artwork:

- assets/images/mountains.jpg, notebook.jpg, whiteboard.jpg, coffee.jpg, gym.jpg:
  generated during this project with the built-in image-generation tool.
  Generation provenance and prompts are documented in assets/images/README.md.
  They are not claimed to be externally licensed stock photographs.
- assets/images/music-demo.svg: original project-authored vector illustrations
  for fictional albums, loaded by the local demo only.
- assets/favicon.svg: project-authored vector favicon.
- The paper texture and workout icons are inline SVG/CSS, not external images.
- Production music.json has no artwork or tracks, so there are no external
  production album-cover requests to credit.

## Demo and privacy

Removed IPv6 loopback from the demo hostname allowlist to match the exact
requested localhost/127.0.0.1 restriction. Added regression coverage for both
allowed hosts and GitHub Pages, arbitrary public hosts, IPv6 and deceptive
localhost-like hostnames. A browser served the actual current files under a
public test hostname with ?demo=1; no example JSON was requested.

The committed example files are public repository content and remain directly
downloadable if deployed. The restriction prevents the website from selecting
or presenting them as public personal data; it is not file access control.

No provider API requests occur on page load. Weather uses only explicit opt-in,
does not store/log coordinates, and handles denial/failure without retrying.
Tests use mock coordinates and mock weather responses, not the visitor's location.

## Credential scan scope

Case-insensitive scans covered api_key, client_secret, access_token,
refresh_token, password, oauth.json and browser.json, including hidden working
files except Git internals. Additional patterns checked common GitHub, AWS,
Google and OpenAI key forms and private-key headers. The current committed
HEAD had no matches for the requested credential names.

Working-tree matches were limited to:

- docs/DATA_INTEGRATIONS.md: setup documentation and environment-variable names;
- assets/js/live/public-data.js: URL.password check that rejects embedded
  credentials in a URL.

This report and image documentation add descriptive words, not secret values.
No authentication files or actual credential strings were found. This is not
a claim that all 3,019 historical commits across all local refs were exhaustively
scanned for every possible secret format.

## Links and browser checks

- /resume/resume.pdf: HTTP 200, PDF signature checked. Resume links point here.
- /about/, /blog/, /resume/: HTTP 200 and responsive checks at every target width.
- Homepage navigation and fragments: static validation plus browser keyboard,
  mobile menu, Escape, destination focus and sticky-header offset checks pass.
- https://github.com/Satyamaddipati: HTTP 200.
- https://reason-guessr.vercel.app: HTTP 200.
- https://www.linkedin.com/in/sbmaddipati: HTTP 999 to both browser HTTP and web
  retrieval; manually open in a normal signed-in browser before sign-off.
- mailto:sbmaddipati@wisc.edu: address/link syntax verified across pages; no email
  was sent and mailbox deliverability is not claimed.
- Unpublished notes and projects without supplied source URLs are not fake links.

All images were fully decoded before final visual screenshots. Cropped images
use object-fit: cover; they are not stretched. At 375px the 44px artwork strip
scrolls inside itself; the page does not scroll horizontally. At 1024px workout
distance/age use the intended second row. At 768px and 375px the components stack.
Handwritten note text does not overlap heading/body text. The only programmatic
clipping detection was the deliberately screen-reader-only weather explanation.

Screenshots from this pass:

- /private/var/folders/wq/vbzysb4x6b7c127k079gtlnr0000gq/T/portfolio-final-qa-sIjbjB/
- /private/var/folders/wq/vbzysb4x6b7c127k079gtlnr0000gq/T/life-lately-djwjcK/

## Git and remaining blockers

- Current branch: redesign/editorial-portfolio.
- Cached origin/redesign/editorial-portfolio: HEAD is 1 commit ahead.
- Live git ls-remote verification: that remote branch no longer exists.
  The cached tracking reference is stale; there is no live upstream branch
  against which to report an ahead count.
- HEAD is 3 commits ahead of origin/main; the live main hash matches the local
  origin/main reference (093386c5c3885eee9efa16c845fd42acb8943abc).
- Working tree contains the earlier uncommitted redesign and live-data work,
  plus this QA pass's minimal demo-host fix, tests, credits and report.

Before publication: resolve lake/portrait rights and complete the LinkedIn manual
check. Then stage/commit all intended files and decide whether to recreate the
redesign remote branch or merge via the chosen publishing workflow.
