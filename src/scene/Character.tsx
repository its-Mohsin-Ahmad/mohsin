import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { OfficeMaterials } from './OfficeMaterials'
import { useOffice } from '../office/OfficeContext'

/**
 * A stylised but well-proportioned human character built from primitives.
 * Supports idle + walk animation, keyboard (WASD/arrows) movement, smooth
 * turning, ground alignment, and tap-to-move navigation to a point.
 */

const WALK_SPEED = 4.2
const TURN_SPEED = 8
const BOUND = 20.5

export default function Character({
  materials,
  onArrive,
}: {
  materials: OfficeMaterials
  onArrive?: () => void
}) {
  const group = useRef<THREE.Group>(null)
  const leftLeg = useRef<THREE.Group>(null)
  const rightLeg = useRef<THREE.Group>(null)
  const leftArm = useRef<THREE.Group>(null)
  const rightArm = useRef<THREE.Group>(null)
  const keys = useRef<Record<string, boolean>>({})
  const { camera } = useThree()
  const { characterGoal, clearCharacterGoal } = useOffice()

  const dest = useRef<THREE.Vector3 | null>(null)
  const heading = useRef(Math.PI)

  useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement
      return (
        !!el &&
        (el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          (el as HTMLElement).isContentEditable)
      )
    }
    const down = (e: KeyboardEvent) => {
      if (isTyping()) return
      keys.current[e.key.toLowerCase()] = true
      dest.current = null
    }
    const up = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useEffect(() => {
    if (characterGoal) {
      dest.current = new THREE.Vector3(characterGoal[0], 0, characterGoal[1])
    }
  }, [characterGoal])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(delta, 0.05)

    let vx = 0
    let vz = 0

    if (dest.current) {
      const dx = dest.current.x - g.position.x
      const dz = dest.current.z - g.position.z
      const dist = Math.hypot(dx, dz)
      if (dist < 0.35) {
        dest.current = null
        clearCharacterGoal()
        onArrive?.()
      } else {
        vx = (dx / dist) * WALK_SPEED
        vz = (dz / dist) * WALK_SPEED
      }
    } else {
      const k = keys.current
      let fx = 0
      let fz = 0
      if (k['w'] || k['arrowup']) fz -= 1
      if (k['s'] || k['arrowdown']) fz += 1
      if (k['a'] || k['arrowleft']) fx -= 1
      if (k['d'] || k['arrowright']) fx += 1
      if (fx !== 0 || fz !== 0) {
        const camDir = new THREE.Vector3()
        camera.getWorldDirection(camDir)
        const yaw = Math.atan2(camDir.x, camDir.z)
        const cos = Math.cos(-yaw)
        const sin = Math.sin(-yaw)
        const rx = fx * cos - fz * sin
        const rz = fx * sin + fz * cos
        const len = Math.hypot(rx, rz) || 1
        vx = (rx / len) * WALK_SPEED
        vz = (rz / len) * WALK_SPEED
      }
    }

    const speed = Math.hypot(vx, vz)

    if (speed > 0.1) {
      g.position.x = THREE.MathUtils.clamp(g.position.x + vx * dt, -BOUND, BOUND)
      g.position.z = THREE.MathUtils.clamp(g.position.z + vz * dt, -BOUND, BOUND)
      const targetHeading = Math.atan2(vx, vz)
      let diff = targetHeading - heading.current
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      heading.current += diff * Math.min(1, TURN_SPEED * dt)
      g.rotation.y = heading.current

      const t = performance.now() * 0.012
      const swing = Math.sin(t) * 0.6
      if (leftLeg.current) leftLeg.current.rotation.x = swing
      if (rightLeg.current) rightLeg.current.rotation.x = -swing
      if (leftArm.current) leftArm.current.rotation.x = -swing * 0.8
      if (rightArm.current) rightArm.current.rotation.x = swing * 0.8
    } else {
      const t = performance.now() * 0.002
      if (leftLeg.current) leftLeg.current.rotation.x *= 0.9
      if (rightLeg.current) rightLeg.current.rotation.x *= 0.9
      if (leftArm.current) leftArm.current.rotation.x = Math.sin(t) * 0.05
      if (rightArm.current) rightArm.current.rotation.x = -Math.sin(t) * 0.05
      g.position.y = Math.sin(t) * 0.01
    }
  })

  return (
    <group ref={group} position={[-15, 0, 17]} rotation={[0, Math.PI, 0]}>
      {/* Legs */}
      <group ref={leftLeg} position={[-0.13, 0.78, 0]}>
        <mesh position={[0, -0.39, 0]} castShadow material={materials.fabric}>
          <capsuleGeometry args={[0.09, 0.6, 4, 12]} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.13, 0.78, 0]}>
        <mesh position={[0, -0.39, 0]} castShadow material={materials.fabric}>
          <capsuleGeometry args={[0.09, 0.6, 4, 12]} />
        </mesh>
      </group>

      {/* Shoes */}
      <mesh position={[-0.13, 0.05, 0.03]} castShadow material={materials.metalDark}>
        <boxGeometry args={[0.14, 0.08, 0.24]} />
      </mesh>
      <mesh position={[0.13, 0.05, 0.03]} castShadow material={materials.metalDark}>
        <boxGeometry args={[0.14, 0.08, 0.24]} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.15, 0]} castShadow material={materials.fabricWarm}>
        <capsuleGeometry args={[0.24, 0.5, 6, 16]} />
      </mesh>
      <mesh position={[0, 1.42, 0]} castShadow material={materials.gold}>
        <torusGeometry args={[0.12, 0.02, 8, 20]} />
      </mesh>

      {/* Arms */}
      <group ref={leftArm} position={[-0.3, 1.32, 0]}>
        <mesh position={[0, -0.26, 0]} castShadow material={materials.fabricWarm}>
          <capsuleGeometry args={[0.07, 0.44, 4, 12]} />
        </mesh>
        <mesh position={[0, -0.52, 0]} castShadow material={materials.wall}>
          <sphereGeometry args={[0.07, 12, 12]} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.3, 1.32, 0]}>
        <mesh position={[0, -0.26, 0]} castShadow material={materials.fabricWarm}>
          <capsuleGeometry args={[0.07, 0.44, 4, 12]} />
        </mesh>
        <mesh position={[0, -0.52, 0]} castShadow material={materials.wall}>
          <sphereGeometry args={[0.07, 12, 12]} />
        </mesh>
      </group>

      {/* Neck + head */}
      <mesh position={[0, 1.52, 0]} castShadow material={materials.wall}>
        <cylinderGeometry args={[0.06, 0.07, 0.1, 12]} />
      </mesh>
      <mesh position={[0, 1.74, 0]} castShadow material={materials.wall}>
        <sphereGeometry args={[0.17, 20, 20]} />
      </mesh>
      <mesh position={[0, 1.8, -0.02]} castShadow material={materials.walnut}>
        <sphereGeometry args={[0.175, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
    </group>
  )
}

