import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { rooms, ROOM_CELL } from '../data/rooms'
import { useOffice } from '../office/OfficeContext'
import type { RoomMeta } from '../types'
import { getIcon } from '../components/icons'

/**
 * A clickable floor hotspot per room. The 3D ring sits on the atrium floor; an
 * HTML label (icon + name) is projected at the same world position so it stays
 * aligned with the room and responds to camera movement.
 */
function Hotspot({ room }: { room: RoomMeta }) {
  const { active, navigateTo, sendCharacterTo, labelsVisible } = useOffice()
  const isActive = active === room.id
  const ring = useRef<THREE.Mesh>(null)
  const Icon = getIcon(room.icon)

  useFrame((state) => {
    if (ring.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2 + room.position.x) * 0.04
      ring.current.scale.setScalar(isActive ? s * 1.15 : s)
    }
  })

  const labelY = ROOM_CELL * 0.5

  return (
    <group position={[room.position.x, 0, room.position.z]}>
      {/* Invisible large clickable pad on the floor */}
      <mesh
        position={[0, 0.03, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation()
          sendCharacterTo(room.position.x, room.position.z)
          navigateTo(room.id)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <circleGeometry args={[ROOM_CELL * 0.4, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Visible highlight ring */}
      <mesh ref={ring} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.35, 40]} />
        <meshBasicMaterial
          color={isActive ? '#D9AE63' : '#7f8c96'}
          transparent
          opacity={isActive ? 0.9 : 0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Floating HTML label anchored to the room */}
      {labelsVisible && (
        <Html
          position={[0, labelY, 0]}
          center
          distanceFactor={18}
          zIndexRange={[20, 0]}
          style={{ transition: 'opacity .25s ease' }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              sendCharacterTo(room.position.x, room.position.z)
              navigateTo(room.id)
            }}
            className={`room-label group flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 backdrop-blur-md transition-all duration-200 ${
              isActive
                ? 'border-gold/80 bg-[#0B1115]/85 text-gold shadow-gold'
                : 'border-[#26343D] bg-[#0B1115]/70 text-text-primary hover:border-gold/50'
            }`}
          >
            <Icon size={15} className={isActive ? 'text-gold' : 'text-text-secondary'} />
            <span className="text-xs font-medium tracking-wide">{room.name}</span>
          </button>
        </Html>
      )}
    </group>
  )
}

export default function RoomHotspots() {
  return (
    <group name="room-hotspots">
      {rooms.map((room) => (
        <Hotspot key={room.id} room={room} />
      ))}
    </group>
  )
}
