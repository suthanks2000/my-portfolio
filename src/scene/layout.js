/**
 * The map of the universe.
 *
 * Every cluster lives at a fixed world position and the camera travels through
 * them in one unbroken line down -Z. Keeping the anchors and the camera
 * keyframes in the same file is what makes the spatial continuity checkable:
 * if a camera key looks at [0, -4, -172], you can see here that that is the IoT
 * architecture and nothing else.
 */

/** Cluster centres, in chapter order. */
export const ANCHORS = {
  portal: [0, 0, 0],
  hero: [0, 0.4, -26],
  about: [11, 1, -52],
  skills: [-12, 2, -78],
  timeline: [0, 0.4, -110],
  projects: [
    [-14, 1, -140],
    [0, 3, -146],
    [14, 0, -140],
  ],
  iot: [0, -4, -174],
  health: [14, 2, -198],
  lms: [20, -3, -208],
  education: [-12, -1, -228],
  contact: [0, 1, -252],
  exitPortal: [0, 1, -240],
}

/**
 * Camera keyframes. `s` is the scroll stage (see lib/scrollStage.js), so a key
 * at 4.5 is the midpoint of the experience chapter. Between keys the rig eases
 * with a smoothstep and then damps, which is what keeps the move continuous
 * instead of snapping at chapter boundaries.
 */
export const CAMERA_KEYS = [
  // Scene 1 - loading intro: a slow approach to the portal.
  { s: 0.0, pos: [0, 0.3, 13], look: [0, 0, 0], fov: 38 },
  { s: 0.8, pos: [0, 0.15, 3.6], look: [0, 0, -4], fov: 40 },

  // Scene 2 - hero reveal: through the portal, push in, then drift around it.
  { s: 1.0, pos: [0, 0.6, -2.5], look: [0, 0.4, -26], fov: 46 },
  { s: 1.45, pos: [4.5, 1.8, -14], look: [0, 0.4, -26], fov: 42 },
  { s: 1.8, pos: [-3.5, 1.4, -20], look: [0, 0.4, -26], fov: 41 },

  // Scene 3 - about: transition through the rotating architecture.
  { s: 2.15, pos: [2, 2.2, -38], look: [11, 1, -52], fov: 40 },
  { s: 2.7, pos: [6.5, 1.2, -46], look: [12, 1, -54], fov: 40 },

  // Scene 4 - skills: orbit the constellation.
  { s: 3.1, pos: [-2, 2.6, -66], look: [-12, 2, -78], fov: 42 },
  { s: 3.6, pos: [-18.5, 3.2, -75], look: [-12, 2, -78], fov: 44 },

  // Scene 5 - experience: a tracking fly-through of the timeline.
  { s: 4.05, pos: [-10, 1.6, -94], look: [-2, 0.6, -108], fov: 44 },
  { s: 4.55, pos: [-1, 1.1, -106], look: [3, 0.6, -118], fov: 42 },
  { s: 4.85, pos: [4, 1.3, -118], look: [0, 1, -130], fov: 42 },

  // Scene 6 - project universe: travel between the three portals.
  { s: 5.15, pos: [-8, 1.6, -128], look: [-14, 1, -140], fov: 42 },
  { s: 5.45, pos: [-1, 2.8, -134], look: [0, 3, -146], fov: 44 },
  { s: 5.8, pos: [10.5, 1, -133], look: [14, 0, -140], fov: 42 },

  // Scene 7 - IoT case study: into the architecture, then through it.
  { s: 6.1, pos: [1, -1.2, -158], look: [0, -4, -174], fov: 46 },
  { s: 6.55, pos: [0, -3.6, -169], look: [0, -4, -180], fov: 52 },
  { s: 6.85, pos: [0, -3.9, -180], look: [0, -4, -190], fov: 50 },

  // Scene 8 - HealthTech, then the LMS environment.
  { s: 7.15, pos: [7, 0.4, -188], look: [14, 2, -198], fov: 44 },
  { s: 7.6, pos: [17.5, 0.6, -201], look: [20, -3, -208], fov: 46 },

  // Scene 9 - education: a gentle orbit of the platform.
  { s: 8.1, pos: [-5, 0.6, -217], look: [-12, -1, -228], fov: 40 },
  { s: 8.6, pos: [-16.5, 1.2, -231], look: [-12, -1, -228], fov: 38 },

  // Scene 10 - contact, then the retreat back out through the portal.
  { s: 9.0, pos: [0, 1.4, -245], look: [0, 1, -252], fov: 42 },
  { s: 9.55, pos: [0, 1.2, -236], look: [0, 1, -252], fov: 48 },
  { s: 10.0, pos: [0, 1.1, -227], look: [0, 1, -252], fov: 52 },
]

/**
 * Static accent lights at the four largest set pieces. The count is fixed on
 * purpose: adding or removing a light at runtime recompiles every material and
 * shows up as a hitch mid-move, so the rest of the lighting is a pair of lamps
 * that travel with the camera (see Universe.jsx) plus emissive geometry.
 */
export const KEY_LIGHTS = [
  { position: [0, 2.5, -24], intensity: 40, distance: 38 },
  { position: [-12, 3, -76], intensity: 34, distance: 34 },
  { position: [0, -2, -176], intensity: 34, distance: 42 },
  { position: [0, 2.5, -250], intensity: 34, distance: 36 },
]

export const PALETTE = {
  ember: '#ff6a2c',
  emberSoft: '#ffa96b',
  blue: '#4c7cff',
  bone: '#e8eaf0',
  charcoal: '#0d0f14',
  obsidian: '#05060a',
}
