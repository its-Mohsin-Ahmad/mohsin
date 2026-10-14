import { useMemo } from 'react'
import * as THREE from 'three'
import { ROOM_CELL } from '../data/rooms'
import type { OfficeMaterials } from './OfficeMaterials'

/**
 * Builds the connected architectural shell: a 3x3 grid of rooms around a
 * central atrium. Open-roof (cutaway) so the elevated isometric camera can see
 * inside every room.
 */

const WALL_H = 3.2
const WALL_T = 0.18
const HALF = (ROOM_CELL * 3) / 2 // 22.5
const OUTER_MARGIN = 1.2

function Wall({
  position,
  size,
  materials,
  rotationY = 0,
}: {
  position: [number, number, number]
  size: [number, number, number]
  materials: OfficeMaterials
  rotationY?: number
}) {
  return (
    <mesh position={position} rotation={[0, rotationY, 0]} castShadow receiveShadow material={materials.wall}>
      <boxGeometry args={size} />
    </mesh>
  )
}

/** A wall segment with a doorway gap in the middle (two pieces + lintel). */
function WallWithDoor({
  position,
  width,
  materials,
  rotationY = 0,
  doorWidth = 1.6,
  doorHeight = 2.1,
}: {
  position: [number, number, number]
  width: number
  materials: OfficeMaterials
  rotationY?: number
  doorWidth?: number
  doorHeight?: number
}) {
  const sideW = (width - doorWidth) / 2
  const lintelH = WALL_H - doorHeight
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[-width / 2 + sideW / 2, doorHeight / 2, 0]} castShadow receiveShadow material={materials.wall}>
        <boxGeometry args={[sideW, doorHeight, WALL_T]} />
      </mesh>
      <mesh position={[width / 2 - sideW / 2, doorHeight / 2, 0]} castShadow receiveShadow material={materials.wall}>
        <boxGeometry args={[sideW, doorHeight, WALL_T]} />
      </mesh>
      <mesh position={[0, doorHeight + lintelH / 2, 0]} castShadow material={materials.wall}>
        <boxGeometry args={[doorWidth, lintelH, WALL_T]} />
      </mesh>
    </group>
  )
}

/** Glass partition wall (meeting room + some office fronts). */
function GlassWall({
  position,
  width,
  materials,
  rotationY = 0,
}: {
  position: [number, number, number]
  width: number
  materials: OfficeMaterials
  rotationY?: number
}) {
  const mullions = Math.max(2, Math.round(width / 1.5))
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, WALL_H / 2, 0]} material={materials.glass}>
        <boxGeometry args={[width, WALL_H, 0.05]} />
      </mesh>
      <mesh position={[0, 0.06, 0]} material={materials.metalDark}>
        <boxGeometry args={[width, 0.12, 0.09]} />
      </mesh>
      <mesh position={[0, WALL_H - 0.06, 0]} material={materials.metalDark}>
        <boxGeometry args={[width, 0.12, 0.09]} />
      </mesh>
      {Array.from({ length: mullions }).map((_, i) => {
        const x = -width / 2 + ((i + 1) * width) / (mullions + 1)
        return (
          <mesh key={i} position={[x, WALL_H / 2, 0]} material={materials.metalDark}>
            <boxGeometry args={[0.05, WALL_H, 0.07]} />
          </mesh>
        )
      })}
    </group>
  )
}

/** Recessed ceiling light panel with a warm glow. */
function RecessedLight({
  position,
  materials,
  radius = 0.35,
}: {
  position: [number, number, number]
  materials: OfficeMaterials
  radius?: number
}) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.ceiling}>
        <circleGeometry args={[radius, 20]} />
      </mesh>
      <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius * 0.7, 20]} />
        <meshBasicMaterial color="#ffe9c2" toneMapped={false} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

/** Warm linear LED strip. */
function CeilingLight({
  position,
  materials,
}: {
  position: [number, number, number]
  materials: OfficeMaterials
}) {
  return (
    <group position={position}>
      <mesh material={materials.metalDark}>
        <boxGeometry args={[0.7, 0.05, 0.18]} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <planeGeometry args={[0.62, 0.1]} />
        <meshBasicMaterial color="#fff3dd" toneMapped={false} />
      </mesh>
    </group>
  )
}

export default function OfficeArchitecture({
  materials,
}: {
  materials: OfficeMaterials
}) {
  const c = ROOM_CELL
  const floors = useMemo(() => {
    const cells: Array<[number, number]> = []
    for (let gx = -1; gx <= 1; gx++) {
      for (let gz = -1; gz <= 1; gz++) {
        cells.push([gx * c, gz * c])
      }
    }
    return cells
  }, [c])

  return (
    <group name="office-architecture">
      {/* Ground / base platform */}
      <mesh position={[0, -0.15, 0]} receiveShadow material={materials.wallDark}>
        <boxGeometry args={[c * 3 + OUTER_MARGIN * 2, 0.3, c * 3 + OUTER_MARGIN * 2]} />
      </mesh>

      {/* Per-room oak floors */}
      {floors.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.001, z]} receiveShadow material={materials.oak}>
          <boxGeometry args={[c, 0.06, c]} />
        </mesh>
      ))}

      {/* Atrium feature floor + MA medallion */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[c * 0.42, 48]} />
        <meshStandardMaterial color="#a87f4e" roughness={0.5} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.gold}>
        <ringGeometry args={[c * 0.2, c * 0.235, 48]} />
      </mesh>

      {/* ---- Outer perimeter walls (visitor entrance on Reception) ---- */}
      <Wall position={[0, WALL_H / 2, -HALF]} size={[c * 3 + OUTER_MARGIN * 2, WALL_H, WALL_T]} materials={materials} />
      <Wall position={[HALF, WALL_H / 2, 0]} size={[WALL_T, WALL_H, c * 3 + OUTER_MARGIN * 2]} materials={materials} />
      <Wall position={[-HALF, WALL_H / 2, 0]} size={[WALL_T, WALL_H, c * 3 + OUTER_MARGIN * 2]} materials={materials} />
      <Wall position={[c / 2, WALL_H / 2, HALF]} size={[c * 2 + OUTER_MARGIN, WALL_H, WALL_T]} materials={materials} />
      <Wall position={[-HALF + 0.4, WALL_H / 2, HALF]} size={[0.8, WALL_H, WALL_T]} materials={materials} />
      {/* Entrance glass doors */}
      <mesh position={[-c + 1.1, 1.1, HALF]} material={materials.glass}>
        <boxGeometry args={[1.4, 2.2, 0.05]} />
      </mesh>
      <mesh position={[-c + 1.1, 1.1, HALF]} material={materials.metalDark}>
        <boxGeometry args={[1.5, 0.08, 0.09]} />
      </mesh>

      {/* ---- Interior partitions forming the 8 rooms + atrium ---- */}
      <Wall position={[-c, WALL_H / 2, 0]} size={[c, WALL_H, WALL_T]} materials={materials} />
      <Wall position={[c, WALL_H / 2, 0]} size={[c, WALL_H, WALL_T]} materials={materials} />
      <WallWithDoor position={[-c * 0.5, WALL_H / 2, -0.02]} width={c * 0.5} materials={materials} />
      <WallWithDoor position={[c * 0.5, WALL_H / 2, -0.02]} width={c * 0.5} materials={materials} />

      <Wall position={[0, WALL_H / 2, -c]} size={[WALL_T, WALL_H, c]} materials={materials} />
      <Wall position={[0, WALL_H / 2, c]} size={[WALL_T, WALL_H, c]} materials={materials} />
      <WallWithDoor position={[-0.02, WALL_H / 2, -c * 0.5]} width={c * 0.5} materials={materials} rotationY={Math.PI / 2} />
      <WallWithDoor position={[-0.02, WALL_H / 2, c * 0.5]} width={c * 0.5} materials={materials} rotationY={Math.PI / 2} />

      {/* Glass front for the Meeting Room facing the atrium */}
      <GlassWall position={[0, 0, -c * 0.5 - 0.02]} width={c * 0.7} materials={materials} rotationY={Math.PI / 2} />
      {/* Reception glass front */}
      <GlassWall position={[-c * 0.5, 0, c * 0.5 + 0.02]} width={c * 0.7} materials={materials} rotationY={Math.PI / 2} />

      {/* ---- Ceiling light grid (open roof) ---- */}
      {floors.map(([x, z], i) => (
        <group key={i}>
          <RecessedLight position={[x - 2.5, WALL_H - 0.02, z - 2.5]} materials={materials} />
          <RecessedLight position={[x + 2.5, WALL_H - 0.02, z + 2.5]} materials={materials} />
        </group>
      ))}
      <CeilingLight position={[0, WALL_H - 0.1, -c * 0.5]} materials={materials} />
      <CeilingLight position={[0, WALL_H - 0.1, c * 0.5]} materials={materials} />
    </group>
  )
}

export { THREE }

