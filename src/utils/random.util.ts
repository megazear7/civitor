import { RandomNumber, Seed } from "../types/standard.type";

/**
 * We need seedable randome numbers, which the default JS random
 * library does not provide. This way, we can save the seed to an object
 * and use it to "replay" randomness consistently across frames and clients.
 */
export function random(seed: Seed): RandomNumber {
  seed |= 0;
  seed = (seed + 0x9e3779b9) | 0;
  let t = seed ^ (seed >>> 16);
  t = Math.imul(t, 0x21f0aaad);
  t = t ^ (t >>> 15);
  t = Math.imul(t, 0x735a2d97);
  return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
}

export function seed(): Seed {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";
  for (let i = 0; i < 10; i++) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
  return h1 >>> 0;
}
