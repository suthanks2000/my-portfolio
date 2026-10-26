import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { CAMERA_KEYS } from './layout'
import { scrollStage } from '../lib/scrollStage'

const smoothstep = (t) => t * t * (3 - 2 * t)

/** Exponential damping that is frame-rate independent. */
const lerpFactor = (lambda, dt) => 1 - Math.exp(-lambda * Math.min(dt, 0.1))

/**
 * Drives the one continuous camera move. Scroll picks the point on the
 * keyframed path; damping does the rest, so a flick of the wheel still reads as
 * a dolly rather than a cut, and a slow scroll never stutters.
 */
export default function CameraRig({ reduced = false, onFocusChange }) {
  const { camera } = useThree()
  const keys = useMemo(() => CAMERA_KEYS, [])

  const targetPos = useRef(new THREE.Vector3(...keys[0].pos))
  const targetLook = useRef(new THREE.Vector3(...keys[0].look))
  const look = useRef(new THREE.Vector3(...keys[0].look))
  const targetFov = useRef(keys[0].fov)
  const started = useRef(false)
  const reportedFocus = useRef(-1)

  useFrame((state, delta) => {
    const stage = THREE.MathUtils.clamp(scrollStage.value, keys[0].s, keys[keys.length - 1].s)

    // Locate the keyframe segment we are inside.
    let i = 0
    while (i < keys.length - 2 && stage > keys[i + 1].s) i += 1
    const a = keys[i]
    const b = keys[i + 1]
    const span = Math.max(b.s - a.s, 1e-4)
    const t = smoothstep(THREE.MathUtils.clamp((stage - a.s) / span, 0, 1))

    targetPos.current.set(
      THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
      THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
      THREE.MathUtils.lerp(a.pos[2], b.pos[2], t)
    )
    targetLook.current.set(
      THREE.MathUtils.lerp(a.look[0], b.look[0], t),
      THREE.MathUtils.lerp(a.look[1], b.look[1], t),
      THREE.MathUtils.lerp(a.look[2], b.look[2], t)
    )
    targetFov.current = THREE.MathUtils.lerp(a.fov, b.fov, t)

    if (!reduced) {
      // A slow float so a parked camera still feels hand-held - no shake:
      // amplitude stays under 15cm and the periods are long and coprime.
      const time = state.clock.elapsedTime
      targetPos.current.x += Math.sin(time * 0.17) * 0.14
      targetPos.current.y += Math.cos(time * 0.13) * 0.1
    }

    if (!started.current || reduced) {
      camera.position.copy(targetPos.current)
      look.current.copy(targetLook.current)
      started.current = true
    } else {
      camera.position.lerp(targetPos.current, lerpFactor(3.4, delta))
      look.current.lerp(targetLook.current, lerpFactor(2.6, delta))
    }

    camera.lookAt(look.current)

    const nextFov = reduced
      ? targetFov.current
      : THREE.MathUtils.lerp(camera.fov, targetFov.current, lerpFactor(2.4, delta))
    if (Math.abs(nextFov - camera.fov) > 0.01) {
      camera.fov = nextFov
      camera.updateProjectionMatrix()
    }

    // Depth of field focuses on whatever the camera is looking at.
    const distance = camera.position.distanceTo(look.current)
    if (onFocusChange && Math.abs(distance - reportedFocus.current) > 0.25) {
      reportedFocus.current = distance
      onFocusChange(distance)
    }
  })

  return null
}
