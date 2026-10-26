/**
 * Deterministic pseudo-random numbers.
 *
 * Scene layouts are generated, not authored by hand, but they must be identical
 * on every load - otherwise a reload reshuffles the rocks and the universe stops
 * feeling like a real place.
 */
export function seeded(seed) {
  let a = seed >>> 0
  return function next() {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Random float in [min, max). */
export function range(rand, min, max) {
  return min + rand() * (max - min)
}
