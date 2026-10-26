/** Capability and preference probes the scene uses to pick its quality tier. */

import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY)
    const onChange = (event) => setReduced(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * 'high' gets the full treatment (post-processing, depth of field, dense
 * particles); 'low' keeps the same universe but trims everything that costs
 * fill rate, so phones and integrated GPUs still hold a smooth camera move.
 */
export function qualityTier() {
  if (typeof window === 'undefined') return 'low'
  if (prefersReducedMotion()) return 'low'

  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  const narrow = window.innerWidth < 900
  const touchOnly = navigator.maxTouchPoints > 0 && window.innerWidth < 1200

  if (narrow || touchOnly || cores <= 4 || memory <= 4) return 'low'
  return 'high'
}

export function supportsWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    )
  } catch {
    return false
  }
}
