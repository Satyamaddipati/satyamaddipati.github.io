import { isDemo, parseDate, relativeTime, duration, element } from './public-data.js';

function artwork(song, small = false) {
  const placeholder = () => element('span', 'music-art music-art-missing', '♪');
  if (!song.artwork) {
    const node = placeholder();
    node.setAttribute('aria-label', song.album || song.title);
    node.setAttribute('role', 'img');
    return node;
  }
  const img = element('img', 'music-art');
  img.width = img.height = small ? 44 : 72;
  img.alt = song.album ? song.album + ' — ' + song.artist : song.title + ' — ' + song.artist;
  img.referrerPolicy = 'no-referrer';
  img.addEventListener('error', () => {
    const fallback = placeholder();
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', img.alt);
    img.replaceWith(fallback);
  }, { once: true });
  img.src = song.artwork;
  return img;
}
export function renderMusic(root, data, now = Date.now()) {
  const recent = data.recent;
  const current = data.current || recent[0];
  if (!current) {
    root.replaceChildren(element('p', 'lately-empty', 'music integration coming soon'));
    return;
  }
  const updated = parseDate(data.updatedAt);
  // A static snapshot must not claim to be live indefinitely.
  const playing = current.isPlaying && updated !== null && updated <= now + 60_000 && now - updated < 15 * 60_000;
  const currentRow = element('div', 'music-current');
  currentRow.append(artwork(current));
  const copy = element('div', 'music-copy');
  const title = element('p', 'music-track');
  if (current.url) {
    const link = element('a', '', current.title);
    link.href = current.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    title.append(link);
  } else title.textContent = current.title;
  copy.append(title, element('p', 'music-artist', current.artist));
  const metadata = [playing ? 'now playing' : 'recently played', duration(current.durationSeconds, true)];
  metadata.push(relativeTime(current.playedAt, now));
  copy.append(element('p', 'music-meta', metadata.filter(Boolean).join(' · ')));
  if (current.album) copy.title = current.album;
  currentRow.append(copy);
  const nodes = [currentRow];
  if (recent.length) {
    const strip = element('ol', 'music-recent');
    strip.setAttribute('aria-label', 'Recent listening, newest first');
    strip.tabIndex = 0;
    recent.forEach(song => {
      const item = element('li');
      item.title = [song.title, song.artist, song.album, relativeTime(song.playedAt, now)].filter(Boolean).join(' · ');
      if (song.url) {
        const link = element('a');
        link.href = song.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', song.title + ' — ' + song.artist);
        link.append(artwork(song, true));
        item.append(link);
      } else item.append(artwork(song, true));
      strip.append(item);
    });
    nodes.push(strip);
  }
  root.replaceChildren(...nodes);
}
export async function initMusic(root, provider) {
  try {
    const { data, now } = await provider.load();
    renderMusic(root, data, now);
    setInterval(() => renderMusic(root, data, isDemo() ? now : Date.now()), 60_000);
  } catch { /* The static empty state remains available when the feed fails. */ }
}
