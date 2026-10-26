/**
 * Scroll -> "stage" tracking.
 *
 * The whole site is one continuous camera move, so the scene needs a single
 * floating-point position along the ten chapters: stage 0 is the intro portal,
 * stage 4.5 is halfway between the experience and projects chapters, stage 9 is
 * the outro. Chapter sections tag themselves with `data-chapter` and this module
 * turns their layout offsets into that number.
 *
 * It is deliberately NOT React state: the value changes every frame and is read
 * inside useFrame, so re-rendering the tree on it would be wasteful. Components
 * that need a discrete chapter index subscribe through `useChapterIndex`.
 */

import { useEffect, useState } from 'react'

export const scrollStage = {
  /** Continuous position along the chapters, 0 .. chapterCount - 1. */
  value: 0,
  /** Normalised page progress, 0 .. 1. */
  progress: 0,
  /** Nearest chapter index. */
  index: 0,
  /** Scroll velocity in stages per second, signed. Used for subtle lead/lag. */
  velocity: 0,
  chapterCount: 1,
}

let anchors = []
let listeners = new Set()
let lastValue = 0
let lastTime = 0
let rafId = 0
let measureQueued = false

function measure() {
  const sections = Array.from(document.querySelectorAll('[data-chapter]'))
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
  anchors = sections.map((el) => el.getBoundingClientRect().top + scrollTop)
  scrollStage.chapterCount = Math.max(anchors.length, 1)
  measureQueued = false
  update()
}

function queueMeasure() {
  if (measureQueued) return
  measureQueued = true
  requestAnimationFrame(measure)
}

function stageFromScroll(scrollTop) {
  if (anchors.length < 2) return 0
  const last = anchors.length - 1
  if (scrollTop <= anchors[0]) return 0
  if (scrollTop >= anchors[last]) {
    // Past the final anchor the last chapter keeps playing out to the page end.
    const tail = document.documentElement.scrollHeight - window.innerHeight - anchors[last]
    if (tail <= 1) return last
    return last + Math.min(1, (scrollTop - anchors[last]) / tail)
  }
  for (let i = 0; i < last; i += 1) {
    const from = anchors[i]
    const to = anchors[i + 1]
    if (scrollTop < to) {
      const span = Math.max(to - from, 1)
      return i + (scrollTop - from) / span
    }
  }
  return last
}

function update() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
  const limit = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const now = performance.now()
  const stage = stageFromScroll(scrollTop)
  const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.25) : 0

  scrollStage.velocity = dt > 0 ? (stage - lastValue) / dt : 0
  scrollStage.value = stage
  scrollStage.progress = Math.min(Math.max(scrollTop / limit, 0), 1)

  lastValue = stage
  lastTime = now

  // `index` only flips past the midpoint of a chapter, which keeps the chapter
  // rail and the overlay copy from flickering at a boundary.
  const nextIndex = Math.min(Math.round(stage), scrollStage.chapterCount - 1)
  if (nextIndex !== scrollStage.index) {
    scrollStage.index = nextIndex
    listeners.forEach((fn) => fn(nextIndex))
  }
}

function onScroll() {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    update()
  })
}

/** Starts tracking. Returns a teardown function. */
export function initScrollStage() {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', queueMeasure)
  // Fonts and lazily mounted panels change section heights after first paint.
  if (document.fonts?.ready) document.fonts.ready.then(queueMeasure).catch(() => {})
  const timer = window.setTimeout(queueMeasure, 600)

  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', queueMeasure)
    window.clearTimeout(timer)
    if (rafId) cancelAnimationFrame(rafId)
    rafId = 0
  }
}

/** Re-reads section offsets; call after anything that changes page height. */
export function remeasureScrollStage() {
  queueMeasure()
}

/** Discrete chapter index as React state, for nav highlighting. */
export function useChapterIndex() {
  const [index, setIndex] = useState(scrollStage.index)

  useEffect(() => {
    setIndex(scrollStage.index)
    listeners.add(setIndex)
    return () => {
      listeners.delete(setIndex)
    }
  }, [])

  return index
}
