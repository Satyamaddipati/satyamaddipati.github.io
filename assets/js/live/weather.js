const conditions = new Map([
  [0, 'clear'], [1, 'mostly clear'], [2, 'partly cloudy'], [3, 'overcast'],
  [45, 'fog'], [48, 'freezing fog'], [51, 'light drizzle'], [53, 'drizzle'],
  [55, 'heavy drizzle'], [56, 'freezing drizzle'], [57, 'freezing drizzle'],
  [61, 'light rain'], [63, 'rain'], [65, 'heavy rain'], [66, 'freezing rain'],
  [67, 'freezing rain'], [71, 'light snow'], [73, 'snow'], [75, 'heavy snow'],
  [77, 'snow grains'], [80, 'light showers'], [81, 'showers'], [82, 'heavy showers'],
  [85, 'snow showers'], [86, 'heavy snow showers'], [95, 'thunderstorms'],
  [96, 'thunderstorms with hail'], [99, 'thunderstorms with hail']
]);

export function initWeather(root) {
  const button = root.querySelector('#weather-button');
  const status = root.querySelector('#weather-status');
  const credit = root.querySelector('#weather-credit');
  const unavailable = () => {
    button.hidden = true;
    status.textContent = 'weather unavailable';
  };
  button.hidden = false;
  button.addEventListener('click', () => {
    button.disabled = true;
    button.textContent = 'finding your weather…';
    if (!navigator.geolocation || !window.isSecureContext) {
      unavailable();
      return;
    }
    // One request per page visit, initiated only by the visitor.
    try {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10_000);
        try {
          if (!Number.isFinite(coords.latitude) || !Number.isFinite(coords.longitude) ||
              Math.abs(coords.latitude) > 90 || Math.abs(coords.longitude) > 180) {
            throw new Error('Location unavailable');
          }
          // Approximate to ~1 km. No storage, logging, analytics or reverse geocoder.
          const query = new URLSearchParams({
            latitude: coords.latitude.toFixed(2),
            longitude: coords.longitude.toFixed(2),
            current: 'temperature_2m,apparent_temperature,weather_code',
            temperature_unit: 'fahrenheit'
          });
          const response = await fetch('https://api.open-meteo.com/v1/forecast?' + query, {
            signal: controller.signal, credentials: 'omit',
            cache: 'no-store', referrerPolicy: 'no-referrer'
          });
          if (!response.ok) throw new Error('Weather unavailable');
          const { current } = await response.json();
          if (!current || !Number.isFinite(current.temperature_2m)) throw new Error('Weather unavailable');
          const parts = [Math.round(current.temperature_2m) + '°F'];
          if (Number.isFinite(current.apparent_temperature)) {
            parts.push('feels ' + Math.round(current.apparent_temperature) + '°F');
          }
          parts.push(conditions.get(current.weather_code) || 'conditions unavailable');
          status.textContent = parts.join(' · ');
          button.hidden = true;
          credit.hidden = false;
        } catch {
          unavailable();
        } finally {
          clearTimeout(timeout);
        }
      }, unavailable, { enableHighAccuracy: false, timeout: 10_000, maximumAge: 0 });
    } catch {
      unavailable();
    }
  }, { once: true });
}
