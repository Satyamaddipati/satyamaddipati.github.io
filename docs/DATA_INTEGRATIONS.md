# Life, lately

This static GitHub Pages site displays explicitly public, sanitized snapshots.
No provider authentication, credentials, or scheduled jobs are implemented.

## Preview and configuration

Start the existing preview server from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

- Real empty state: http://127.0.0.1:8000/#life-lately
- Fictional visual fixture: http://127.0.0.1:8000/?demo=1#life-lately

Demo selection is restricted to localhost and 127.0.0.1.
On any public hostname, even with ?demo=1, the normal JSON files are loaded.
The example files themselves are public repository fixtures, not private data.
They have a visible fictional-demo label and a frozen asOf time so relative
timestamps remain useful in previews. The hand-drawn SVG album illustrations
represent fictional albums. They are not real listening history.

No configuration is needed for the clock or opt-in weather. No username or key
is configured in browser code. Production music/workout files are intentionally
empty. Populate them only with real, explicitly approved public data.

## Files and adapter boundary

| File | Responsibility |
| --- | --- |
| root script.js | Existing site interactions; dynamic imports only when the subsection exists |
| assets/js/live/life-lately.js | Subsection initialization and injectable providers |
| assets/js/live/providers/workout-provider.js | load() interface and normalizeWorkouts() allowlist |
| assets/js/live/providers/music-provider.js | load() interface and normalizeMusic() allowlist |
| assets/js/live/public-data.js | JSON fetch, loopback-only demo selection, safe URLs, formatting |
| assets/js/live/workouts.js | Provider-independent workout rendering |
| assets/js/live/music.js | Provider-independent track/artwork rendering |
| assets/js/live/clock.js | Visitor browser timezone and minute updates |
| assets/js/live/weather.js | One opt-in geolocation request and Open-Meteo weather |
| assets/data/workouts.json | Real public workout snapshot |
| assets/data/music.json | Real public music snapshot |
| assets/data/*.example.json | Clearly fictional local visual fixtures |
| assets/images/music-demo.svg | Original fictional album artwork, used only by demo fixtures |
| journal.css | Subsection styling, scoped to its component classes |

The root entry remains a classic deferred script. Dynamic import() loads the
browser ES modules correctly without changing the existing menu or supporting
routes. scripts/ remains reserved for build and validation tooling.

Future data flow:

Provider API → scheduled/private automation → sanitize → assets/data/*.json → site

The rendering functions accept normalized data, not Garmin, Strava or Last.fm
responses. Unknown fields are not rendered; invalid rows are skipped. Text is
inserted with textContent, not interpreted as HTML. Links and artwork accept
HTTPS or same-origin root-relative paths, excluding embedded credentials.
Fetch failures and malformed snapshots leave the quiet static empty state.

## Workout contract

The committed production structure is:

```json
{
  "updatedAt": null,
  "summary": {
    "sleepMinutes": null,
    "restingHeartRate": null,
    "bodyBattery": null,
    "stress": null
  },
  "activities": []
}
```

updatedAt is null or an ISO 8601 timestamp with timezone. Summary numbers are
nullable: sleepMinutes is minutes, restingHeartRate is beats/minute, bodyBattery
is the provider's actual 0–100 value; stress is a nullable provider-reported
0–100 value. Null fields are omitted entirely. There
is no inferred recovery, strain, stress, or readiness score.

Each activity uses:

| Field | Meaning |
| --- | --- |
| id | Public string identifier, never an authentication identifier |
| source | Source label; informational, never used to select a provider |
| type | run, bike, strength, swim, hike, walk; unrecognized types use a neutral other icon |
| name | Plain text public activity name, required for a row |
| distanceMeters | Nonnegative number or null; displayed in meters below 1 km, km otherwise, or an em dash |
| durationSeconds | Nonnegative number or null; unknown duration is left blank |
| startedAt | ISO 8601 timestamp with timezone or null; missing age is omitted, future activities are omitted |
| url | Optional HTTPS public activity link; null leaves a noninteractive mark |

The component displays up to six activities, newest first. Distance and duration
are formatted locally; missing distance does not become a fabricated zero.
Sleep-only summaries can render even when no activities have been shared.
See workouts.example.json for a complete fictional example.

## Music contract

```json
{
  "updatedAt": null,
  "current": null,
  "recent": []
}
```

Each track has id (public string identifier), title and artist (required strings), album (optional string),
artwork (optional local/HTTPS URL), durationSeconds (number or null), playedAt
(ISO 8601 timestamp with timezone or null), url (optional public track URL),
and isPlaying (boolean). A supplied URL makes the title and history artwork
clickable, including a permitted YouTube Music link.
recent should contain 8–12 tracks, newest first; the renderer accepts fewer
without padding and caps the strip at twelve. current falls back to the first
valid recent track. Missing artwork gets a small neutral music glyph.

An alternative flow remains YouTube Music → scrobbler → Last.fm → private exporter →
music.json → portfolio. No YouTube Music cookies or authentication data belong
in the website.

A later private exporter can use Last.fm user.getRecentTracks with limit=12,
format=json, a configured LASTFM_USERNAME (initially empty), and a LASTFM_API_KEY
held in its private environment. This method requires an API key but not user
authentication. It returns recent songs and a nowplaying marker.
[Official method documentation](https://www.last.fm/api/show/user.getRecentTracks).

Map track name, artist, album, artwork, date.uts and the nowplaying marker into
the public contract. Convert Unix seconds to ISO timestamps. A currently playing
track may have no playedAt value; keep it null instead of inventing a scrobble.
Do not assume this endpoint supplies track duration: omit it unless separately
verified. Never publish the raw response or private configuration.

The UI treats isPlaying as current only when updatedAt is under 15 minutes old.
It reevaluates that state once per minute without polling the provider. A stale
snapshot becomes recently played; this is a public snapshot, not a live audio player.
Choose a future exporter cadence deliberately within the provider's limits.

## Final provider interfaces

Both exported provider objects implement the same asynchronous load contract:

```js
// No provider credential belongs in this browser interface.
{
  async load() {
    return { data: normalizedSnapshot, now: Date.now() };
  }
}
```

life-lately.js initializes the views with workoutProvider and musicProvider.
Its optional second argument accepts {workouts, music} implementations for local
tests. The defaults fetch the normal public JSON (or loopback-only fixtures),
then normalize an allowlist of fields before passing anything to the renderer.
Unknown fields are discarded; unsupported types use the generic sport icon.
Nullable metrics remain null and are omitted by the view.

normalizeWorkouts(raw) and normalizeMusic(raw) are exported at the provider
boundary. Future private updaters write this exact contract. They do not need
to change the frontend module, visual layout, or credential-free load method.
The old flat assets/js modules were relocated, not kept as competing entry points.

A workout record has this normalized shape:

```json
{
  "id": "",
  "source": "",
  "type": "run",
  "name": "",
  "startedAt": null,
  "durationSeconds": null,
  "distanceMeters": null,
  "url": null
}
```

A music record (both current and each recent item) has this shape:

```json
{
  "id": "",
  "title": "",
  "artist": "",
  "album": "",
  "artwork": null,
  "playedAt": null,
  "durationSeconds": null,
  "url": null,
  "isPlaying": false
}
```

The production JSON files contain no records. In fixtures, demo:true and asOf
are preview-only envelope fields; they are not forwarded into normalized models.

## Future YouTube Music / ytmusicapi

The preferred next-phase option is now:

ytmusicapi → private Python updater → normalize/sanitize → music.json → frontend

ytmusicapi is unofficial and not supported or endorsed by Google.
It runs only in the private updater, never in browser JavaScript.
[Project documentation](https://ytmusicapi.readthedocs.io/en/stable/).

Normalize verified title, artist, album, thumbnail, duration and video URL when
available. Preserve the history ordering. Use playedAt only when an exact
listening timestamp is actually available; a history grouping such as Today
is not an exact timestamp. A history response does not prove a song is currently
playing, so isPlaying remains false unless a source explicitly reports that
state. Missing album/artwork/duration/time stay null or empty as specified.
A public URL can use a verified video ID; no signed/authenticated URLs may be
published.

Authentication choices and their actual requirements must be checked when the
private integration is explicitly authorized. OAuth client ID/secret values alone
may not be sufficient: any user authorization or refresh material must also stay
in the private environment. No authentication, history fetch, or updater script
has been implemented in this pass.

## Strava

No Strava API feed or OAuth is implemented. A future integration can mount an
official Strava activity/profile embed, or independently produce permitted
sanitized workout JSON at the existing adapter boundary.

Strava's API agreement restricts displaying a user's API data to others.
Converting an API response to JSON does not bypass that restriction. A public
export must use a source and permissions that actually allow public display;
otherwise use an official supported embed. Recheck the applicable terms before
implementing either path.
[Strava API agreement](https://www.strava.com/legal/api).

## Garmin

Future official, authorized Garmin integration belongs in private automation.
Normalize activities and approved wellness values into the public schema.
The Activity API can supply activities, distance and duration. The Health API
can supply sleep, resting HR, stress and Body Battery where the approved API
provides them. These are normalized into the documented optional summary fields.
Steps could be added in a later schema revision.
[Garmin Connect Developer Program](https://developer.garmin.com/gc-developer-program/overview/).

No Garmin login, unofficial browser credential flow, or OAuth has been added.
Only export wellness values that the owner explicitly wants public.

## Visitor time and weather

The clock uses Intl.DateTimeFormat().resolvedOptions().timeZone, renders the
visitor's local time/day/timezone, and updates at minute boundaries. No location
permission or network request is needed for time.

Only pressing show local weather invokes getCurrentPosition(). The website
rounds the returned coordinates to two decimals, then sends that approximate
location to Open-Meteo over HTTPS with no cookies or referrer. It fetches current
temperature_2m, apparent_temperature and weather_code in Fahrenheit and displays
a compact temperature/condition line with attribution.
[Open-Meteo API documentation](https://open-meteo.com/en/docs).

The browser must support geolocation in a secure context (HTTPS or localhost).
Denial, timeout, absent geolocation, HTTP failure, and invalid weather responses
all produce weather unavailable. There is one attempt per page visit and no
automatic retry, polling, or repeated permission prompt. The clock remains.

Coordinates are never placed in the DOM, logs, cookies, browser storage,
analytics, or committed files. Open-Meteo necessarily receives the rounded
location for the requested forecast. No reverse geocoder is used, so no guessed
city or street address is displayed. The API request is transient; the site
does not control the provider's own request retention.

## Private automation security

Only a future explicitly authorized task should implement provider connections.
If GitHub Actions is used, credentials must come exclusively from GitHub Actions
Secrets; a backend/serverless exporter should use its secret environment.
Never commit tokens, refresh tokens, passwords, API secrets, OAuth credentials,
Garmin credentials, session cookies, or private provider responses.

Export using an allowlist of the documented fields. Exclude GPS routes, precise
locations, account identifiers, private notes, private activities, and URLs with
credentials or signed authentication parameters. Review every public snapshot:
committed information is public and remains in Git history. A public JSON adapter
does not grant additional rights to disclose provider data.

## Optional scheduled automation — documentation only

A later explicitly authorized workflow could be named
.github/workflows/refresh-life-data.yml, scheduled every 30–60 minutes.
Possible private updater entry points:

- scripts/integrations/fetch_garmin.py
- scripts/integrations/fetch_music.py

These files and the workflow have intentionally not been created.

The workflow would read credentials from GitHub Actions Secrets into its process
environment, obtain only authorized data, normalize and sanitize it, validate the
snapshot, and publish only the two approved JSON files. On provider errors, retain
the last valid snapshot rather than replacing it with partial or invented data.
A serverless/private backend can produce the same files instead.

Possible private environment names (names only, not browser configuration):

- GARMIN_CLIENT_ID, GARMIN_CLIENT_SECRET
- STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN
- YTM_CLIENT_ID, YTM_CLIENT_SECRET

These are planning names; the actual approved provider may require additional
authorization material. Secrets must never be printed in logs, committed as
configuration, or copied into generated JSON, artifacts, URLs, or screenshots.
Scheduled polling does not guarantee real-time playback; preserve the snapshot's
actual updatedAt timestamp and the UI's stale-status behavior.

## Validation

Run the existing checks:

```sh
python3 scripts/check_site.py
node --test scripts/check_behavior.cjs
node --check script.js
git diff --check
```

The additional browser validation in scripts/check_lately.cjs uses an installed
Playwright and an isolated browser. Configure PLAYWRIGHT_MODULE and
BROWSER_EXECUTABLE if they are not available through normal module resolution.
It checks both data modes, narrow viewports, invalid data, blocked URL schemes,
clock updates, stale playback, and mocked opt-in weather success/denial/failure.
The test does not request the real visitor's location. Screenshot paths are
printed after capture.
