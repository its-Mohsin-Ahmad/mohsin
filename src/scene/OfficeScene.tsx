import { useMemo } from 'react'
import * as THREE from 'three'
import OfficeArchitecture from './OfficeArchitecture'
import Lighting from './Lighting'
import CameraController from './CameraController'
import Character from './Character'
import RoomHotspots from './RoomHotspot'
import useOfficeMaterials from './OfficeMaterials'
import {
  Reception,
  DevelopmentStudio,
  AnalyticsLab,
  ProjectShowroom,
  MeetingRoom,
  EducationCorner,
  ContactLounge,
  OwnersCabin,
} from '../rooms'
import { useOffice } from '../office/OfficeContext'

/**
 * Assembles the whole 3D office inside the R3F Canvas: architecture, lighting,
 * all eight rooms' furniture, the character, room hotspots, and the camera.
 * Clicking empty floor sends the character to walk there (tap-to-move).
 */
export default function OfficeScene({ quality }: { quality: 'high' | 'low' }) {
  const materials = useOfficeMaterials()
  const { sendCharacterTo } = useOffice()

  // Ground click handler: project pointer to the floor plane for tap-to-move.
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    [],
  )
  const hit = useMemo(() => new THREE.Vector3(), [])

  const handleFloorClick = (e: any) => {
    // Only respond when clicking the base ground, not furniture/hotspots.
    if (e.object?.name !== 'ground') return
    raycaster.setFromCamera(e.pointer, e.camera)
    if (raycaster.ray.intersectPlane(plane, hit)) {
      sendCharacterTo(
        THREE.MathUtils.clamp(hit.x, -20.5, 20.5),
        THREE.MathUtils.clamp(hit.z, -20.5, 20.5),
      )
    }
  }

  return (
    <>
      <color attach="background" args={['#0B1115']} />
      <fog attach="fog" args={['#0B1115', 70, 130]} />

      <CameraController />
      <Lighting quality={quality} />

      {/* Invisible ground plane for tap-to-move raycasting (kept raycastable via transparent material) */}
      <mesh
        name="ground"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        onClick={handleFloorClick}
      >
        <planeGeometry args={[120, 120]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <OfficeArchitecture materials={materials} />

      {/* Room furniture */}
      <Reception materials={materials} />
      <DevelopmentStudio materials={materials} />
      <AnalyticsLab materials={materials} />
      <ProjectShowroom materials={materials} />
      <MeetingRoom materials={materials} />
      <EducationCorner materials={materials} />
      <ContactLounge materials={materials} />
      <OwnersCabin materials={materials} />

      <Character materials={materials} />
      <RoomHotspots />
    </>
  )
}
