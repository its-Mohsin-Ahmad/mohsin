import { ROOM_CELL } from '../data/rooms'
import type { OfficeMaterials } from '../scene/OfficeMaterials'
import { Desk, Chair, Monitor, Plant, Shelf, Rug } from '../scene/Furniture'

/**
 * Room interior furniture (part B).
 */

const c = ROOM_CELL

/* -------------------------- PROJECT SHOWROOM (c, +c) -------------------------- */
export function ProjectShowroom({ materials }: { materials: OfficeMaterials }) {
  const colors = ['#D9AE63', '#E0A458', '#9FB4A0', '#C97B5A', '#7E8FA6']
  return (
    <group position={[c, 0, c]}>
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={materials.wallDark}>
        <cylinderGeometry args={[0.9, 1.0, 0.8, 24]} />
      </mesh>
      <mesh position={[0, 0.85, 0]} rotation={[-0.2, 0, 0]} castShadow material={materials.screen}>
        <boxGeometry args={[1.4, 0.9, 0.05]} />
      </mesh>
      {[-1, 1].map((s) =>
        [-1, 1].map((t) => (
          <group key={`${s}-${t}`} position={[s * 4.2, 0, t * 3.4]}>
            <mesh position={[0, 1.2, 0]} castShadow material={materials.screen}>
              <boxGeometry args={[2.4, 1.5, 0.06]} />
            </mesh>
            <mesh position={[0, 1.2, 0.04]}>
              <planeGeometry args={[2.2, 1.3]} />
              <meshBasicMaterial color={colors[(s + t + 2) % colors.length]} toneMapped={false} transparent opacity={0.55} />
            </mesh>
            <mesh position={[0, 0.1, 0]} castShadow material={materials.metalDark}>
              <boxGeometry args={[2.4, 0.2, 0.3]} />
            </mesh>
          </group>
        )),
      )}
      <Plant position={[-6, 0, 5.5]} materials={materials} scale={1.2} />
      <Plant position={[6, 0, 5.5]} materials={materials} scale={1.1} />
    </group>
  )
}

/* ---------------------------- MEETING ROOM (0, -c) ---------------------------- */
export function MeetingRoom({ materials }: { materials: OfficeMaterials }) {
  return (
    <group position={[0, 0, -c]}>
      {/* Conference table */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow material={materials.walnut}>
        <cylinderGeometry args={[2.0, 2.0, 0.1, 32]} />
      </mesh>
      <mesh position={[0, 0.37, 0]} castShadow material={materials.metalDark}>
        <cylinderGeometry args={[0.3, 0.5, 0.74, 16]} />
      </mesh>
      {/* Chairs around the table */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <Chair
            key={i}
            position={[Math.sin(a) * 2.7, 0, Math.cos(a) * 2.7]}
            rotationY={a + Math.PI}
            materials={materials}
          />
        )
      })}
      {/* Large presentation screen on the north wall */}
      <mesh position={[0, 1.6, -6.4]} castShadow material={materials.screen}>
        <boxGeometry args={[4.2, 2.3, 0.08]} />
      </mesh>
      <mesh position={[0, 1.6, -6.34]}>
        <planeGeometry args={[4.0, 2.1]} />
        <meshBasicMaterial color="#1a2c3a" toneMapped={false} transparent opacity={0.8} />
      </mesh>
      <Plant position={[-5.5, 0, 4]} materials={materials} scale={1.2} />
      <Plant position={[5.5, 0, 4]} materials={materials} scale={1.1} />
    </group>
  )
}

/* --------------------------- EDUCATION CORNER (0, +c) --------------------------- */
export function EducationCorner({ materials }: { materials: OfficeMaterials }) {
  return (
    <group position={[0, 0, c]}>
      <Rug position={[0, 0, 0]} materials={materials} width={4} depth={3} color="#33403a" />
      {/* Study desk + laptop */}
      <Desk position={[-1.5, 0, 0.5]} materials={materials} width={1.6} depth={0.7} />
      <Monitor position={[-1.5, 0, 0.3]} rotationY={Math.PI} materials={materials} screenColor="#2a2a1c" emissive={0.6} />
      <Chair position={[-1.5, 0, 1.5]} rotationY={Math.PI} materials={materials} fabricMat="fabricWarm" />
      {/* Bookshelves */}
      <Shelf position={[3, 0, 2.5]} materials={materials} width={2.4} shelves={5} />
      <Shelf position={[3, 0, -1.5]} materials={materials} width={2.4} shelves={5} />
      <Plant position={[-4, 0, 3]} materials={materials} scale={1.3} />
      <Plant position={[4, 0, -3]} materials={materials} scale={1} />
    </group>
  )
}

/* --------------------------- CONTACT LOUNGE (-c, 0) --------------------------- */
export function ContactLounge({ materials }: { materials: OfficeMaterials }) {
  return (
    <group position={[-c, 0, 0]}>
      <Rug position={[0, 0, 0]} materials={materials} width={5} depth={4} color="#33404a" />
      {/* Coffee table */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow material={materials.walnut}>
        <cylinderGeometry args={[0.7, 0.7, 0.06, 24]} />
      </mesh>
      <mesh position={[0, 0.17, 0]} castShadow material={materials.metalDark}>
        <cylinderGeometry args={[0.06, 0.06, 0.34, 12]} />
      </mesh>
      {/* Lounge sofa */}
      <group position={[0, 0, -1.8]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow material={materials.fabric}>
          <boxGeometry args={[3.2, 0.4, 0.9]} />
        </mesh>
        <mesh position={[0, 0.7, -0.38]} castShadow material={materials.fabric}>
          <boxGeometry args={[3.2, 0.7, 0.2]} />
        </mesh>
      </group>
      {/* Armchairs */}
      <Chair position={[-2.4, 0, 1]} rotationY={-0.6} materials={materials} fabricMat="fabricWarm" scale={1.2} />
      <Chair position={[2.4, 0, 1]} rotationY={0.6} materials={materials} fabricMat="fabricWarm" scale={1.2} />
      <Plant position={[-5, 0, 3]} materials={materials} scale={1.4} />
      <Plant position={[5, 0, 3]} materials={materials} scale={1.2} />
      <Plant position={[5, 0, -3]} materials={materials} scale={1} />
    </group>
  )
}

/* --------------------------- OWNER'S CABIN (c, 0) --------------------------- */
export function OwnersCabin({ materials }: { materials: OfficeMaterials }) {
  return (
    <group position={[c, 0, 0]}>
      {/* Premium wooden desk */}
      <Desk position={[0, 0, -1]} materials={materials} width={2.6} depth={0.9} />
      {/* Dual monitors */}
      <Monitor position={[-0.8, 0, -1.3]} rotationY={0.25} materials={materials} screenColor="#2a2438" emissive={0.7} />
      <Monitor position={[0.8, 0, -1.3]} rotationY={-0.25} materials={materials} screenColor="#1c2a3b" emissive={0.7} />
      {/* Professional chair */}
      <Chair position={[0, 0, 0.2]} rotationY={Math.PI} materials={materials} fabricMat="fabricWarm" scale={1.1} />
      {/* Subtle MA wall logo behind the desk */}
      <mesh position={[0, 2.0, -6.4]} castShadow material={materials.gold}>
        <boxGeometry args={[1.4, 1.4, 0.06]} />
      </mesh>
      <mesh position={[0, 2.0, -6.35]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial color="#0B1115" toneMapped={false} />
      </mesh>
      {/* Bookshelves */}
      <Shelf position={[-5.5, 0, -4]} materials={materials} width={2} shelves={5} />
      <Shelf position={[-5.5, 0, 1]} materials={materials} width={2} shelves={5} />
      {/* Desk accessories + plant */}
      <mesh position={[1.4, 0.79, -0.8]} castShadow material={materials.metalDark}>
        <boxGeometry args={[0.3, 0.04, 0.2]} />
      </mesh>
      <Plant position={[5, 0, 4]} materials={materials} scale={1.3} />
      <Plant position={[4, 0, -4]} materials={materials} scale={1} />
    </group>
  )
}

