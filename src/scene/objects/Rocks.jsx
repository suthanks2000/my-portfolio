import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { PALETTE } from '../layout'
import { seeded, range } from '../rng'

const dummy = new THREE.Object3D()

/**
 * Floating rock field. One instanced mesh, matrices rewritten each frame so the
 * rocks tumble and drift individually - at these counts that is a few hundred
 * matrix writes, far cheaper than a mesh each.
 */
export function RockBelt({
  center = [0, 0, 0],
  spread = [34, 12, 40],
  count = 64,
  seed = 11,
  reduced = false,
}) {
  const mesh = useRef(null)

  const rocks = useMemo(() => {
    const rand = seeded(seed)
    return new Array(count).fill(0).map(() => ({
      x: center[0] + range(rand, -spread[0], spread[0]),
      y: center[1] + range(rand, -spread[1], spread[1]),
      z: center[2] + range(rand, -spread[2], spread[2]),
      scale: range(rand, 0.35, 2.6),
      spin: range(rand, -0.12, 0.12),
      phase: rand() * Math.PI * 2,
      bob: range(rand, 0.1, 0.5),
      tilt: rand() * Math.PI,
    }))
    // center/spread are literal arrays from the layout map and never change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, seed])

  const settled = useRef(false)

  useFrame((state) => {
    if (!mesh.current) return
    // With reduced motion the field is placed once and then left alone.
    if (reduced && settled.current) return
    const t = reduced ? 0 : state.clock.elapsedTime
    rocks.forEach((rock, i) => {
      dummy.position.set(rock.x, rock.y + Math.sin(t * 0.3 + rock.phase) * rock.bob, rock.z)
      dummy.rotation.set(rock.tilt, t * rock.spin + rock.phase, rock.tilt * 0.5)
      dummy.scale.setScalar(rock.scale)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    settled.current = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#191c23" metalness={0.25} roughness={0.92} flatShading />
    </instancedMesh>
  )
}

/**
 * The illuminated architecture on the horizon: dark slabs with a single ember
 * light strip each, which is what gives the landscape its scale.
 */
export function MonolithCity({
  center = [0, 0, 0],
  spread = [40, 46],
  count = 26,
  seed = 77,
}) {
  const bodies = useRef(null)
  const strips = useRef(null)

  const towers = useMemo(() => {
    const rand = seeded(seed)
    return new Array(count).fill(0).map(() => {
      const height = range(rand, 6, 30)
      return {
        x: center[0] + range(rand, -spread[0], spread[0]),
        z: center[2] + range(rand, -spread[1], spread[1]),
        width: range(rand, 1.2, 3.4),
        depth: range(rand, 1.2, 3.4),
        height,
        y: center[1] - 12 + height / 2,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, seed])

  // Nothing here animates, so the matrices are written once after mount.
  useEffect(() => {
    if (!bodies.current || !strips.current) return
    towers.forEach((tower, i) => {
      dummy.position.set(tower.x, tower.y, tower.z)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(tower.width, tower.height, tower.depth)
      dummy.updateMatrix()
      bodies.current.setMatrixAt(i, dummy.matrix)

      dummy.scale.set(tower.width * 0.12, tower.height * 0.76, tower.depth * 0.12)
      dummy.position.set(tower.x, tower.y, tower.z + tower.depth * 0.52)
      dummy.updateMatrix()
      strips.current.setMatrixAt(i, dummy.matrix)
    })
    bodies.current.instanceMatrix.needsUpdate = true
    strips.current.instanceMatrix.needsUpdate = true
  }, [towers])

  return (
    <group>
      <instancedMesh ref={bodies} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#12151b" metalness={0.6} roughness={0.55} />
      </instancedMesh>
      <instancedMesh ref={strips} args={[undefined, undefined, count]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={PALETTE.ember} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}
