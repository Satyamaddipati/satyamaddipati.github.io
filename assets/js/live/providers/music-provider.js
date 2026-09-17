import { loadPublicData, text, nonNegative, parseDate, publicURL } from '../public-data.js';

const date = value => parseDate(value) === null ? null : value;
function track(value) {
  if (!value || !text(value.title) || !text(value.artist)) return null;
  return {
    id: text(value.id), title: text(value.title), artist: text(value.artist),
    album: text(value.album), artwork: publicURL(value.artwork),
    playedAt: date(value.playedAt),
    durationSeconds: nonNegative(value.durationSeconds) ? value.durationSeconds : null,
    url: publicURL(value.url), isPlaying: value.isPlaying === true
  };
}

/** Public MusicSnapshot boundary. No provider-specific response fields are retained. */
export function normalizeMusic(raw = {}) {
  return {
    updatedAt: date(raw?.updatedAt), current: track(raw?.current),
    recent: Array.isArray(raw?.recent) ? raw.recent.map(track).filter(Boolean).slice(0, 12) : []
  };
}

/** Interface: load() -> Promise<{data: MusicSnapshot, now: number}>. */
export const musicProvider = {
  async load() {
    const { data, now } = await loadPublicData('music');
    return { data: normalizeMusic(data), now };
  }
};
