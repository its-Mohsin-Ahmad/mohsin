import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { OfficeMaterials } from './OfficeMaterials'


/**
 * Small reusable prop pieces built from primitives. Kept in one file so the
 * architecture and each room can compose furniture without duplicating code.
 */

export function Chair({
  position = [0, 0, 0],
  rotationY = 0,
  materials,
  fabricMat,
  scale = 1,
}: {
  position?: [number, number, number]
  rotationY?: number
  materials: OfficeMaterials
  fabricMat?: 'fabric' | 'fabricWarm'
  scale?: number
}) {
  const seat = fabricMat === 'fabricWarm' ? materials.fabricWarm : materials.fabric
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow material={seat}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
      </mesh>
      <mesh position={[0, 0.78, -0.22]} castShadow material={seat}>
        <boxGeometry args={[0.5, 0.6, 0.08]} />
      </mesh>
      <mesh position={[0, 0.22, 0]} castShadow material={materials.metalDark}>
        <cylinderGeometry args={[0.04, 0.04, 0.36, 12]} />
      </mesh>
      <mesh position={[0, 0.03, 0]} receiveShadow material={materials.metalDark}>
        <cylinderGeometry args={[0.26, 0.28, 0.04, 16]} />
      </mesh>
    </group>
  )
}

export function Desk({
  position = [0, 0, 0],
  rotationY = 0,
  materials,
  width = 1.6,
  depth = 0.7,
}: {
  position?: [number, number, number]
  rotationY?: number
  materials: OfficeMaterials
  width?: number
  depth?: number
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow material={materials.oak}>
        <boxGeometry args={[width, 0.06, depth]} />
      </mesh>
      {[
        [-width / 2 + 0.08, depth / 2 - 0.08],
        [width / 2 - 0.08, depth / 2 - 0.08],
        [-width / 2 + 0.08, -depth / 2 + 0.08],
        [width / 2 - 0.08, -depth / 2 + 0.08],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.37, z]} castShadow material={materials.metalDark}>
          <boxGeometry args={[0.06, 0.74, 0.06]} />
        </mesh>
      ))}
    </group>
  )
}

export function Monitor({
  position = [0, 0, 0],
  rotationY = 0,
  materials,
  screenColor = '#1a2b3a',
  emissive = 0.6,
}: {
  position?: [number, number, number]
  rotationY?: number
  materials: OfficeMaterials
  screenColor?: string
  emissive?: number
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.1, 0]} castShadow material={materials.metalDark}>
        <cylinderGeometry args={[0.16, 0.2, 0.03, 16]} />
      </mesh>
      <mesh position={[0, 0.28, 0]} castShadow material={materials.metalDark}>
        <boxGeometry args={[0.06, 0.42, 0.06]} />
      </mesh>
      <mesh position={[0, 0.66, 0]} castShadow material={materials.metalDark}>
        <boxGeometry args={[1.0, 0.58, 0.04]} />
      </mesh>
      <mesh position={[0, 0.66, 0.023]} material={materials.screen}>
        <planeGeometry args={[0.92, 0.5]} />
      </mesh>
      <mesh position={[0, 0.66, 0.025]}>
        <planeGeometry args={[0.9, 0.48]} />
        <meshBasicMaterial color={screenColor} toneMapped={false} transparent opacity={emissive} />
      </mesh>
    </group>
  )
}

export function Plant({
  position = [0, 0, 0],
  materials,
  scale = 1,
}: {
  position?: [number, number, number]
  materials: OfficeMaterials
  scale?: number
}) {
  const leaves = useRef<Group>(null)
  useFrame((state) => {
    if (leaves.current) {
      leaves.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
    }
  })
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow material={materials.wallDark}>
        <cylinderGeometry args={[0.22, 0.16, 0.36, 16]} />
      </mesh>
      <mesh position={[0, 0.36, 0]} material={materials.walnut}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
      </mesh>
      <group ref={leaves}>
        {[
          [0, 0.7, 0, 0.34],
          [0.16, 0.55, 0.1, 0.24],
          [-0.15, 0.6, -0.08, 0.26],
          [0.05, 0.85, -0.12, 0.22],
          [-0.08, 0.5, 0.16, 0.2],
        ].map(([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]} castShadow material={i % 2 ? materials.foliageDark : materials.foliage}>
            <icosahedronGeometry args={[r, 1]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export function Shelf({
  position = [0, 0, 0],
  rotationY = 0,
  materials,
  width = 1.6,
  shelves = 4,
}: {
  position?: [number, number, number]
  rotationY?: number
  materials: OfficeMaterials
  width?: number
  shelves?: number
}) {
  const books = ['#8a4b3a', '#3f5b7a', '#6b7d4a', '#a3713f', '#4a4a5e', '#7a5a6b']
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (width / 2 - 0.03), 0.9, 0]} castShadow material={materials.walnut}>
          <boxGeometry args={[0.06, 1.8, 0.3]} />
        </mesh>
      ))}
      {Array.from({ length: shelves }).map((_, i) => (
        <mesh key={i} position={[0, 0.18 + i * 0.5, 0]} receiveShadow castShadow material={materials.walnut}>
          <boxGeometry args={[width, 0.04, 0.3]} />
        </mesh>
      ))}
      {Array.from({ length: shelves - 1 }).map((_, si) =>
        Array.from({ length: 5 }).map((_, bi) => (
          <mesh key={`${si}-${bi}`} position={[-width / 2 + 0.4 + bi * 0.18, 0.36 + si * 0.5, 0]} castShadow>
            <boxGeometry args={[0.12, 0.3, 0.2]} />
            <meshStandardMaterial color={books[(si + bi) % books.length]} roughness={0.8} />
          </mesh>
        )),
      )}
    </group>
  )
}

export function Rug({
  position = [0, 0, 0],
  rotationY = 0,
  materials,
  width = 3,
  depth = 2.2,
  color = '#2a3540',
}: {
  position?: [number, number, number]
  rotationY?: number
  materials: OfficeMaterials
  width?: number
  depth?: number
  color?: string
}) {
  return (
    <mesh position={[position[0], 0.012, position[2]]} rotation={[-Math.PI / 2, 0, rotationY]} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  )
}

