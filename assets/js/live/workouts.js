import { isDemo, text, relativeTime, duration, element } from './public-data.js';

const icons = {
  run: ['M10 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3', 'M5 7l3-2 3 3 3 1M8 5L6 10l4 2 1 3M6 10l-3 4'],
  bike: ['M6 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0M16 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0', 'M3 11l4-6 3 6H3l3-8H4m5 0h3l1 8'],
  strength: ['M1 5v6m2-8v10m0-5h10m0-5v10m2-8v6'],
  swim: ['M1 12q2-2 4 0t4 0t4 0M1 15q2-2 4 0t4 0t4 0M3 8l4-4 4 4', 'M12 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3'],
  walk: ['M8 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3', 'M4 8l4-3 3 4 3 1M8 5v5l3 5M8 10l-3 5'],
  hike: ['M8 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3', 'M3 6l3-1 2 5 3 5M8 10l-4 5M8 5l4 3 2-1m-1-2v10'],
  other: ['M2 8h3l2-5 3 10 2-5h2']
};
function icon(type) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('class', 'activity-icon');
  svg.setAttribute('aria-hidden', 'true');
  icons[type].forEach(d => {
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', d);
    svg.append(path);
  });
  return svg;
}
export function renderWorkouts(root, data, now = Date.now()) {
  const activities = data.activities
    .filter(a => !a.startedAt || Date.parse(a.startedAt) <= now)
    .sort((a, b) => (Date.parse(b.startedAt) || 0) - (Date.parse(a.startedAt) || 0)).slice(0, 6);
  const parts = [];
  const summary = data.summary;
  if (summary.sleepMinutes !== null) {
    const minutes = Math.round(summary.sleepMinutes);
    parts.push('sleep ' + Math.floor(minutes / 60) + 'h ' + minutes % 60 + 'm');
  }
  if (summary.restingHeartRate !== null) parts.push('resting hr ' + Math.round(summary.restingHeartRate));
  if (summary.bodyBattery !== null) parts.push('body battery ' + Math.round(summary.bodyBattery));
  if (summary.stress !== null) parts.push('stress ' + Math.round(summary.stress));
  if (!parts.length && !activities.length) {
    root.replaceChildren(element('p', 'lately-empty', 'no workouts shared yet.'));
    return;
  }
  const nodes = [];
  if (parts.length) {
    const line = element('p', 'workout-summary');
    parts.forEach(part => line.append(element('span', '', part)));
    nodes.push(line);
  }
  if (activities.length) {
    const list = element('ul', 'workout-list');
    list.setAttribute('aria-label', 'Recent workouts');
    activities.forEach(a => {
      const type = Object.hasOwn(icons, a.type) ? a.type : 'other';
      const row = element('li', 'workout-row');
      const distance = a.distanceMeters === null ? '—' :
        a.distanceMeters < 1000 ? Math.round(a.distanceMeters) + ' m' : (a.distanceMeters / 1000).toFixed(1) + ' km';
      const title = element('span', 'workout-title', text(a.name));
      title.title = text(a.name);
      const age = element('time', 'workout-age', relativeTime(a.startedAt, now));
      if (a.startedAt) {
        age.dateTime = a.startedAt;
        age.title = new Date(a.startedAt).toLocaleString();
      }
      row.append(icon(type), element('span', 'workout-type', type), title,
        element('span', 'workout-distance', distance),
        element('span', 'workout-duration', duration(a.durationSeconds)), age);
      const url = a.url;
      if (url) {
        const link = element('a', 'workout-link', '→');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', 'View ' + text(a.name));
        row.append(link);
      } else {
        const mark = element('span', 'workout-no-link', '');
        mark.setAttribute('aria-hidden', 'true');
        row.append(mark);
      }
      list.append(row);
    });
    nodes.push(list);
  } else {
    nodes.push(element('p', 'lately-empty', 'no workouts shared yet.'));
  }
  root.replaceChildren(...nodes);
}
export async function initWorkouts(root, provider) {
  try {
    const { data, now } = await provider.load();
    renderWorkouts(root, data, now);
    setInterval(() => renderWorkouts(root, data, isDemo() ? now : Date.now()), 60_000);
  } catch { /* Leave the quiet empty state on missing or invalid data. */ }
}
