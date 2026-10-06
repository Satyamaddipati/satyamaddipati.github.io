# Verified image credits

Verified on 2026-09-17 against the linked Wikimedia Commons description pages
and downloaded image counterparts. The local JPEGs are re-encoded/resized copies,
not byte-identical originals. Pixel comparisons at matching dimensions identified
the same photographs; average absolute per-channel differences were approximately
1–3 on a 0–255 scale. Browser presentation additionally crops them with CSS.

## Bascom Hall

- Local file: images/bascom-hall.jpg
- Work: Bascom Hall on the UW Madison campus in Madison, WI (6351014921)
- Creator: Richard Hurd (local EXIF artist: RA Hurd)
- Source: https://commons.wikimedia.org/wiki/File:Bascom_Hall_on_the_UW_Madison_campus_in_Madison,_WI_(6351014921).jpg
- Original publication: https://www.flickr.com/photos/rahimageworks/6351014921/
- License: Creative Commons Attribution 2.0 Generic
- License URL: https://creativecommons.org/licenses/by/2.0/
- Attribution required: yes
- Changes: resized/re-encoded local JPEG; cropped for display using CSS.
- Local SHA-256: 610227c456bf9a68e024c6f05087436374dcb551df948c729c0988bad6d75808

Credit: “Bascom Hall on the UW Madison campus in Madison, WI” by Richard Hurd,
CC BY 2.0; resized/re-encoded and cropped for display.

## IIT Bombay

- Local file: images/iit-bombay-main-building.jpg
- Work: Main building in IIT Bombay
- Creator: Shishirdasika
- Source: https://commons.wikimedia.org/wiki/File:Main_building_in_IIT_Bombay.jpg
- License: Creative Commons Attribution-ShareAlike 4.0 International
- License URL: https://creativecommons.org/licenses/by-sa/4.0/
- Attribution required: yes
- ShareAlike: adaptations of this image remain under CC BY-SA 4.0.
- Changes: resized/re-encoded local JPEG; cropped for display using CSS.
- Local SHA-256: ccbae5824318f8593dffcee8e3570b8cc45b6e59b1172a26b0712ce048e597c2

Credit: “Main building in IIT Bombay” by Shishirdasika, CC BY-SA 4.0;
resized/re-encoded and cropped for display. The modified image is provided under
CC BY-SA 4.0.

## University of Wisconsin seal

- Local file: images/uw-madison-seal.svg (unused alternate; kept on disk, not
  referenced by any page — superseded by uw-madison-crest.svg below)
- Work: Seal of the University of Wisconsin
- Source: https://commons.wikimedia.org/wiki/File:Seal_of_the_University_of_Wisconsin.svg
- Copyright status: public domain (copyright term expired); Wikimedia Commons
  notes the design may still be protected as a trademark in some jurisdictions.
- Attribution required: no (public domain), credited here anyway for provenance.
- Changes: none; used as downloaded.

## University of Wisconsin–Madison crest ("Motion W" shield)

- Local file: images/uw-madison-crest.svg
- Used on: homepage Experience timeline badge
- Source: extracted directly from the live page markup at https://www.wisc.edu
  (official university site), 2026-10-05
- Copyright/trademark status: active institutional trademark, not public
  domain. Used here solely to factually identify the owner's degree-granting
  institution (nominative use) — not to imply endorsement or affiliation
  beyond being a student. Not redistributed for any other purpose.
- Changes: cropped the SVG viewBox from the full "crest + wordmark" lockup
  (568.86×155) down to the shield only (0 0 102 155), using the shield
  elements' actual bounding box; no paths/gradients altered.

## Tata AIA Life Insurance logo

- Local file: images/tata-aia-logo.svg
- Used on: homepage Experience timeline badge
- Source: fetched directly from the company's own official site,
  https://www.tataaia.com (header logo asset), 2026-10-05
- Copyright/trademark status: active corporate trademark, not public domain
  or freely licensed. Used here solely to factually identify the owner's
  former employer (nominative use) — not to imply endorsement, partnership,
  or any ongoing affiliation. Not redistributed for any other purpose.
- Changes: none; used as downloaded.

Note: the UW crest and Tata AIA logo are both live corporate/institutional
trademarks, included under nominative fair use (truthfully identifying an
institution the owner studied at or worked for), the same basis under which
virtually every résumé, LinkedIn profile, and alumni page displays a school
or employer's logo. This is a different legal basis from the public-domain
UW seal above, and deliberately not extended to any use that could imply
endorsement, sponsorship, or partnership.

An equivalent IIT Bombay mark was deliberately not added: the only version
found (Wikipedia's "Indian_Institute_of_Technology_Bombay_Logo.svg" and
"IIT_Bombay_Wordmark_Logo.svg") is hosted under `/wikipedia/en/`, Wikipedia's
local non-free-media path, and carries a fair-use rationale valid only for
use within Wikipedia articles — not licensed
for reuse on third-party sites. No freely-licensed alternative was found on
Wikimedia Commons as of 2026-10-05. The institute's own site, iitb.ac.in, was
also tried directly (the same method that worked for wisc.edu and tataaia.com)
but did not respond to automated requests from this environment (connection
timed out on both a plain HTTP request and a full headless-browser load).

This file intentionally credits only verified external sources. Unresolved image
provenance is recorded in docs/PRECOMMIT_QA.md, not attributed by guesswork here.
