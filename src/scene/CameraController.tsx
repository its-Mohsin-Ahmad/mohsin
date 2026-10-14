import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useOffice } from '../office/OfficeContext'

/**
 * Camera system for the isometric office. Smoothly eases between the overview
 * and each room's defined destination, while still allowing the user to orbit
 * and zoom within sensible limits.
 */
export default function CameraController() {
  const controls = useRef<any>(null)
  const { cameraGoal, isOverview, navCount } = useOffice()
  const targetPos = useRef(new THREE.Vector3(...cameraGoal.position))
  const targetLook = useRef(new THREE.Vector3(...cameraGoal.target))
  const { camera } = useThree()

  // When navigation changes, set a new easing target.
  useEffect(() => {
    targetPos.current.set(...cameraGoal.position)
    targetLook.current.set(...cameraGoal.target)
    // Let OrbitControls know the target moved so orbiting stays anchored.
    if (controls.current) {
      controls.current.target.copy(targetLook.current)
      controls.current.update()
    }
  }, [cameraGoal, navCount])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)
    // Smooth ease toward destination.
    const ease = 1 - Math.pow(0.001, dt) // frame-rate independent smoothing
    camera.position.lerp(targetPos.current, isOverview ? ease * 0.6 : ease)

    // Keep controls target easing toward the room focus.
    if (controls.current) {
      controls.current.target.lerp(targetLook.current, ease)
    }
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      // Sensible limits: can't zoom through walls or fly away.
      minDistance={12}
      maxDistance={isOverview ? 95 : 46}
      minPolarAngle={0.15}
      maxPolarAngle={Math.PI / 2.25}
      rotateSpeed={0.55}
      zoomSpeed={0.7}
      target={cameraGoal.target}
    />
  )
}
