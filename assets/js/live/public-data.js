// Only localhost can select fictional fixtures. The public site always uses real JSON.
export function isDemo(location = window.location) {
  return ['localhost', '127.0.0.1'].includes(location.hostname) &&
    new URLSearchParams(location.search).get('demo') === '1';
}

export async function loadPublicData(name) {
  if (!['workouts', 'music'].includes(name)) throw new Error('Unknown data source');
  const demo = isDemo();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch('/assets/data/' + name + (demo ? '.example' : '') + '.json', {
      signal: controller.signal, credentials: 'omit', cache: 'no-cache'
    });
    if (!response.ok) throw new Error('Data unavailable');
    const data = await response.json();
    if (!data || typeof data !== 'object' || Array.isArray(data) ||
        (!demo && data.demo === true) || (demo && data.demo !== true)) {
      throw new Error('Invalid public data');
    }
    const asOf = parseDate(data.asOf);
    return { data, now: demo && asOf !== null ? asOf : Date.now() };
  } finally {
    clearTimeout(timeout);
  }
}

export const text = value => typeof value === 'string' ? value.trim().slice(0, 240) : '';
export const nonNegative = value => typeof value === 'number' && Number.isFinite(value) && value >= 0;
export function parseDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(value)) return null;
  const date = Date.parse(value);
  return Number.isFinite(date) ? date : null;
}
export function relativeTime(value, now = Date.now()) {
  const date = parseDate(value);
  if (date === null || date > now + 60_000) return '';
  const seconds = Math.max(0, Math.floor((now - date) / 1000));
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
  if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
  return Math.floor(seconds / 86400) + 'd ago';
}
export function duration(value, music = false) {
  if (!nonNegative(value)) return '';
  const total = Math.round(value);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor(total % 3600 / 60);
  const seconds = total % 60;
  if (music) return (hours ? hours + ':' + String(minutes).padStart(2, '0') : minutes) +
    ':' + String(seconds).padStart(2, '0');
  return [hours ? hours + 'h' : '', minutes || hours ? minutes + 'm' : '', seconds + 's'].filter(Boolean).join(' ');
}
export function publicURL(value) {
  if (!text(value)) return null;
  try {
    const url = new URL(value, window.location.origin);
    if (url.username || url.password) return null;
    if (url.protocol === 'https:' || (url.origin === window.location.origin && value.startsWith('/') && !value.startsWith('//'))) {
      return url.href;
    }
  } catch { /* Invalid links are omitted. */ }
  return null;
}
export function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}
