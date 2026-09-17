import { initClock } from './clock.js';
import { initWeather } from './weather.js';
import { initMusic } from './music.js';
import { initWorkouts } from './workouts.js';
import { isDemo } from './public-data.js';
import { workoutProvider } from './providers/workout-provider.js';
import { musicProvider } from './providers/music-provider.js';

// Providers are injectable for testing; the deployed defaults read public static JSON.
export async function initLifeLately(root, providers = {}) {
  if (!root || root.dataset.initialized) return;
  root.dataset.initialized = 'true';
  root.querySelector('#lately-demo-label').hidden = !isDemo();
  initClock(root);
  initWeather(root);
  await Promise.allSettled([
    initWorkouts(root.querySelector('#workouts-content'), providers.workouts || workoutProvider),
    initMusic(root.querySelector('#music-content'), providers.music || musicProvider)
  ]);
  root.dataset.ready = 'true';
}
