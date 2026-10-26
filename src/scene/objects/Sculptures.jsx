import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { PALETTE } from '../layout'

/**
 * Scene 2's central object: a machined core inside two orbiting rings, lit from
 * the inside so the camera orbit reads as parallax between the shells.
 */
export function HeroCore({ position = [0, 0, 0], reduced = false }) {
  const core = useRef(null)
  const ringA = useRef(null)
  const ringB = useRef(null)
  const glow = useRef(null)

  useFrame((state) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    if (core.current) {
      core.current.rotation.y = t * 0.14
      core.current.rotation.x = Math.sin(t * 0.1) * 0.15
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.22
    if (ringB.current) {
      ringB.current.rotation.x = Math.PI / 2
      ringB.current.rotation.y = -t * 0.17
    }
    if (glow.current) {
      glow.current.material.opacity = 0.22 + Math.sin(t * 0.8) * 0.06
    }
  })

  return (
    <group position={position}>
      <mesh ref={core}>
        <icosahedronGeometry args={[3, 1]} />
        <meshStandardMaterial
          color="#23272f"
          metalness={1}
          roughness={0.18}
          emissive={PALETTE.ember}
          emissiveIntensity={0.1}
          flatShading
        />
      </mesh>

      {/* Inner light bleeding through the seams */}
      <mesh ref={glow} scale={1.04}>
        <icosahedronGeometry args={[3, 1]} />
        <meshBasicMaterial
          color={PALETTE.ember}
          wireframe
          transparent
          opacity={0.22}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={ringA}>
        <torusGeometry args={[5.4, 0.075, 12, 128]} />
        <meshStandardMaterial
          color="#3b414b"
          metalness={1}
          roughness={0.3}
          emissive={PALETTE.ember}
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={ringB}>
        <torusGeometry args={[7.2, 0.05, 12, 128]} />
        <meshStandardMaterial
          color="#2d323b"
          metalness={1}
          roughness={0.35}
          emissive={PALETTE.blue}
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  )
}

/**
 * Scene 3's rotating architecture: concentric arcs on different axes with a
 * slab core. The camera passes through it on the way to the skills chapter, so
 * the inner radius stays clear.
 */
export function AboutArch({ position = [0, 0, 0], reduced = false }) {
  const outer = useRef(null)
  const middle = useRef(null)
  const inner = useRef(null)

  useFrame((state) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    if (outer.current) outer.current.rotation.z = t * 0.06
    if (middle.current) middle.current.rotation.y = -t * 0.09
    if (inner.current) inner.current.rotation.x = t * 0.12
  })

  return (
    <group position={position}>
      <mesh ref={outer}>
        <torusGeometry args={[9, 0.22, 10, 12, Math.PI * 1.45]} />
        <meshStandardMaterial color="#1b1f26" metalness={0.9} roughness={0.4} />
      </mesh>

      <mesh ref={middle} rotation={[0, 0, Math.PI / 5]}>
        <torusGeometry args={[6.4, 0.16, 10, 10, Math.PI * 1.2]} />
        <meshStandardMaterial
          color="#262b33"
          metalness={1}
          roughness={0.28}
          emissive={PALETTE.ember}
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh ref={inner}>
        <torusGeometry args={[4.1, 0.035, 8, 96]} />
        <meshBasicMaterial color={PALETTE.ember} toneMapped={false} />
      </mesh>

      {/* Vertical slabs: the "built" part of the structure */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 11, 0, -2]} rotation={[0, side * 0.3, 0]}>
          <boxGeometry args={[0.6, 22, 3.2]} />
          <meshStandardMaterial color="#14171d" metalness={0.7} roughness={0.5} />
        </mesh>
      ))}

      <mesh position={[0, -11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.4, 12, 72]} />
        <meshStandardMaterial
          color="#0e1116"
          metalness={0.8}
          roughness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}
