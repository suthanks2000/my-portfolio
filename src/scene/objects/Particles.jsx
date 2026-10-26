import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { PALETTE } from '../layout'
import { seeded, range } from '../rng'

/**
 * Dust through the whole corridor. The particles are static in world space on
 * purpose - all the motion you read comes from the camera travelling past them,
 * which is what parallax actually is, and it costs nothing per frame.
 */
export function DustField({ count = 1800, reduced = false }) {
  const ref = useRef(null)

  const geometry = useMemo(() => {
    const rand = seeded(90210)
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = range(rand, -46, 46)
      positions[i * 3 + 1] = range(rand, -20, 20)
      positions[i * 3 + 2] = range(rand, 22, -272)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [count])

  useFrame((state) => {
    if (reduced || !ref.current) return
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.09) * 0.5
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        color="#8fa0c0"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

/** Scene 1's light streaks: thin additive slivers drifting into the portal. */
export function LightStreaks({ reduced = false, count = 7 }) {
  const group = useRef(null)

  const streaks = useMemo(() => {
    const rand = seeded(4242)
    return new Array(count).fill(0).map(() => ({
      x: range(rand, -9, 9),
      y: range(rand, -5, 5),
      z: range(rand, 2, 20),
      length: range(rand, 5, 14),
      speed: range(rand, 1.1, 2.6),
      width: range(rand, 0.012, 0.03),
    }))
  }, [count])

  useFrame((state, delta) => {
    if (reduced || !group.current) return
    group.current.children.forEach((child, i) => {
      const streak = streaks[i]
      child.position.z -= streak.speed * delta
      if (child.position.z < -6) child.position.z = 17 + (i % 5) * 1.6
      // Fade out as it reaches the portal plane.
      child.material.opacity = THREE.MathUtils.clamp(child.position.z / 18, 0, 1) * 0.5
    })
  })

  return (
    <group ref={group}>
      {streaks.map((streak, i) => (
        <mesh key={i} position={[streak.x, streak.y, streak.z]}>
          {/* A filament rather than a plane, so it reads from any camera angle. */}
          <boxGeometry args={[streak.width, streak.width, streak.length]} />
          <meshBasicMaterial
            color={PALETTE.emberSoft}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}
