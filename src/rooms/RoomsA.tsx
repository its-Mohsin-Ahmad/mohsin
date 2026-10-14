import { ROOM_CELL } from '../data/rooms'
import type { OfficeMaterials } from '../scene/OfficeMaterials'
import { Desk, Chair, Monitor, Plant, Shelf, Rug } from '../scene/Furniture'

/**
 * Room interior furniture (part A). Each function returns the furniture for one
 * room, positioned around that room's centre. Rooms sit on the 3x3 grid at
 * ±ROOM_CELL.
 */

const c = ROOM_CELL

/* ----------------------------- RECEPTION (-c, +c) ---------------------------- */
export function Reception({ materials }: { materials: OfficeMaterials }) {
  return (
    <group position={[-c, 0, c]}>
      <Rug position={[0, 0, 1]} materials={materials} width={5} depth={3.5} color="#2c3543" />
      <group position={[-2, 0, -1]} rotation={[0, 0.1, 0]}>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow material={materials.oak}>
          <boxGeometry args={[3.4, 0.1, 0.8]} />
        </mesh>
        <mesh position={[0, 1.05, -0.34]} castShadow material={materials.walnut}>
          <boxGeometry args={[3.4, 1.1, 0.12]} />
        </mesh>
        <mesh position={[0, 1.05, -0.26]}>
          <planeGeometry args={[1.2, 0.6]} />
          <meshBasicMaterial color="#D9AE63" toneMapped={false} transparent opacity={0.9} />
        </mesh>
      </group>
      <Chair position={[1.6, 0, 0.4]} rotationY={-1.4} materials={materials} fabricMat="fabricWarm" />
      <Chair position={[2.4, 0, 1.4]} rotationY={-2.4} materials={materials} fabricMat="fabricWarm" />
      <Plant position={[-4.5, 0, 3]} materials={materials} scale={1.3} />
      <Plant position={[4.5, 0, -3]} materials={materials} scale={1.1} />
      <Desk position={[-1.4, 0, 2.6]} materials={materials} width={1.2} depth={0.6} />
      <Monitor position={[-1.4, 0, 2.4]} rotationY={Math.PI} materials={materials} screenColor="#233a4a" emissive={0.5} />
    </group>
  )
}

/* ------------------------ DEVELOPMENT STUDIO (-c, -c) ------------------------ */
export function DevelopmentStudio({ materials }: { materials: OfficeMaterials }) {
  return (
    <group position={[-c, 0, -c]}>
      <Desk position={[-1.5, 0, -1]} materials={materials} width={2.2} depth={0.8} />
      <Monitor position={[-2.2, 0, -1.2]} rotationY={0.5} materials={materials} screenColor="#1b3a2a" emissive={0.8} />
      <Monitor position={[-1.5, 0, -1.3]} rotationY={0.15} materials={materials} screenColor="#20323f" emissive={0.7} />
      <Monitor position={[-0.8, 0, -1.2]} rotationY={-0.4} materials={materials} screenColor="#2a2438" emissive={0.6} />
      <Chair position={[-1.5, 0, 0]} rotationY={Math.PI} materials={materials} />
      <Desk position={[2, 0, 0.5]} materials={materials} width={1.6} depth={0.7} />
      <Monitor position={[2, 0, 0.3]} rotationY={Math.PI} materials={materials} screenColor="#1f3340" emissive={0.7} />
      <Chair position={[2, 0, 1.5]} rotationY={Math.PI} materials={materials} />
      <Plant position={[-5, 0, 3]} materials={materials} scale={1.2} />
      <Shelf position={[5, 0, -4]} materials={materials} width={2} shelves={4} />
      <Plant position={[4.5, 0, 4]} materials={materials} scale={1} />
      <mesh position={[-1.5, 0.79, -0.5]} castShadow material={materials.metalDark}>
        <boxGeometry args={[0.5, 0.03, 0.18]} />
      </mesh>
    </group>
  )
}

/* --------------------------- ANALYTICS LAB (c, -c) --------------------------- */
export function AnalyticsLab({ materials }: { materials: OfficeMaterials }) {
  return (
    <group position={[c, 0, -c]}>
      <Desk position={[0, 0, -1]} materials={materials} width={2.8} depth={0.8} />
      <Monitor position={[-1.1, 0, -1.2]} rotationY={0.3} materials={materials} screenColor="#1c3b3a" emissive={0.85} />
      <Monitor position={[0, 0, -1.3]} rotationY={0} materials={materials} screenColor="#2a3a1c" emissive={0.8} />
      <Monitor position={[1.1, 0, -1.2]} rotationY={-0.3} materials={materials} screenColor="#1c2a3b" emissive={0.8} />
      <Chair position={[0, 0, 0.2]} rotationY={Math.PI} materials={materials} />
      <mesh position={[1.6, 0.78, -0.4]} rotation={[-Math.PI / 2, 0, 0.2]} castShadow material={materials.paper}>
        <planeGeometry args={[0.4, 0.28]} />
      </mesh>
      <Plant position={[-5, 0, 3]} materials={materials} scale={1.2} />
      <Plant position={[5, 0, 3]} materials={materials} scale={1.1} />
      <Shelf position={[5, 0, -4]} materials={materials} width={1.8} shelves={4} />
    </group>
  )
}
