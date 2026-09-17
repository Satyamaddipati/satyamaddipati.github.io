import { loadPublicData, text, nonNegative, parseDate, publicURL } from '../public-data.js';

const number = (value, max = Infinity) => nonNegative(value) && value <= max ? value : null;
const date = value => parseDate(value) === null ? null : value;
const types = new Set(['run', 'bike', 'swim', 'hike', 'walk', 'strength', 'other']);

/** Public WorkoutSnapshot boundary. Raw provider responses never reach the view. */
export function normalizeWorkouts(raw = {}) {
  const summary = raw?.summary || {};
  const activities = Array.isArray(raw?.activities) ? raw.activities : [];
  return {
    updatedAt: date(raw?.updatedAt),
    summary: {
      sleepMinutes: number(summary.sleepMinutes, 1440),
      restingHeartRate: summary.restingHeartRate > 0 ? number(summary.restingHeartRate, 250) : null,
      bodyBattery: number(summary.bodyBattery, 100),
      stress: number(summary.stress, 100)
    },
    activities: activities.filter(a => a && text(a.name)).slice(0, 100).map(a => ({
      id: text(a.id), source: text(a.source), type: types.has(a.type) ? a.type : 'other',
      name: text(a.name), startedAt: date(a.startedAt),
      durationSeconds: number(a.durationSeconds), distanceMeters: number(a.distanceMeters),
      url: publicURL(a.url)
    }))
  };
}

/** Interface: load() -> Promise<{data: WorkoutSnapshot, now: number}>.
 * Future private exporters change workouts.json, not this renderer or its design.
 */
export const workoutProvider = {
  async load() {
    const { data, now } = await loadPublicData('workouts');
    return { data: normalizeWorkouts(data), now };
  }
};
