import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { PALETTE } from '../layout'
import { seeded, range } from '../rng'

/**
 * The motif the whole piece is built on: a machined metal ring with a glowing
 * event horizon and a slow swirl of ember particles gathering around it.
 * Scene 1 enters through one, Scene 6 holds three of them, Scene 10 leaves
 * through one.
 */
export default function Portal({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  radius = 3.2,
  color = PALETTE.ember,
  particles = 420,
  reduced = false,
  children,
}) {
  const ring = useRef(null)
  const swirl = useRef(null)
  const horizon = useRef(null)

  const spokes = useMemo(
    () => new Array(8).fill(0).map((_, i) => (i / 8) * Math.PI * 2),
    []
  )

  const swirlGeometry = useMemo(() => {
    const rand = seeded(1337 + Math.round(radius * 100))
    const positions = new Float32Array(particles * 3)
    for (let i = 0; i < particles; i += 1) {
      const angle = rand() * Math.PI * 2
      // Most particles hug the ring; a few trail outwards into the dark.
      const r = radius * range(rand, 0.82, 1.35) * (rand() > 0.9 ? 1.4 : 1)
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = Math.sin(angle) * r
      positions[i * 3 + 2] = range(rand, -0.9, 0.9)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [particles, radius])

  useFrame((state) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    if (ring.current) ring.current.rotation.z = t * 0.08
    if (swirl.current) {
      swirl.current.rotation.z = -t * 0.22
      swirl.current.material.opacity = 0.5 + Math.sin(t * 0.9) * 0.14
    }
    if (horizon.current) {
      horizon.current.material.opacity = 0.12 + Math.sin(t * 0.7) * 0.05
      horizon.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.015)
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Machined outer ring */}
      <mesh ref={ring} castShadow={false}>
        <torusGeometry args={[radius, radius * 0.085, 24, 96]} />
        <meshStandardMaterial
          color="#2f343d"
          metalness={1}
          roughness={0.24}
          emissive={color}
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Inner light ring */}
      <mesh>
        <torusGeometry args={[radius * 0.9, radius * 0.016, 12, 96]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      {/* Radial spokes for mechanical weight */}
      {spokes.map((angle) => (
        <mesh
          key={angle}
          position={[Math.cos(angle) * radius * 0.96, Math.sin(angle) * radius * 0.96, 0]}
          rotation={[0, 0, angle]}
        >
          <boxGeometry args={[radius * 0.16, radius * 0.045, radius * 0.1]} />
          <meshStandardMaterial color="#3a4049" metalness={1} roughness={0.3} />
        </mesh>
      ))}

      {/* Event horizon */}
      <mesh ref={horizon}>
        <circleGeometry args={[radius * 0.88, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.14}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Gathering particles */}
      <points ref={swirl} geometry={swirlGeometry}>
        <pointsMaterial
          color={color}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {children}
    </group>
  )
}
