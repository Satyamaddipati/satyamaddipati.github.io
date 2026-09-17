export function initClock(root) {
  const time = root.querySelector('#visitor-time');
  const zone = root.querySelector('#visitor-timezone');
  function update() {
    const now = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const clock = new Intl.DateTimeFormat(undefined, {
      hour: 'numeric', minute: '2-digit', hour12: true, timeZone
    }).format(now);
    const day = new Intl.DateTimeFormat(undefined, { weekday: 'long', timeZone }).format(now);
    time.dateTime = now.toISOString();
    time.textContent = clock + ' · ' + day;
    zone.textContent = timeZone || '';
  }
  update();
  // Align to the next minute, then update once per minute.
  const timeout = setTimeout(() => {
    update();
    setInterval(update, 60_000);
  }, 60_000 - Date.now() % 60_000);
  return timeout;
}
