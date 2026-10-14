import { ContactShadows, Environment } from '@react-three/drei'

/**
 * Architectural lighting: soft directional daylight, warm ambient fill, and a
 * subtle hemisphere light for natural colour bounce. Contact shadows ground the
 * furniture. Environment adds realistic reflections to glass and metal.
 */
export default function Lighting({ quality }: { quality: 'high' | 'low' }) {
  return (
    <>
      {/* Natural daylight from above-front */}
      <directionalLight
        position={[26, 40, 22]}
        intensity={1.15}
        castShadow={quality === 'high'}
        shadow-mapSize-width={quality === 'high' ? 2048 : 1024}
        shadow-mapSize-height={quality === 'high' ? 2048 : 1024}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-camera-far={120}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-40, 40, 40, -40, 0.5, 120]} />
      </directionalLight>

      {/* Warm fill from the opposite side */}
      <directionalLight position={[-20, 24, -18]} intensity={0.35} color="#ffd9a0" />

      {/* Cool sky/ground hemisphere for realism */}
      <hemisphereLight args={['#cfe0ff', '#3a2f24', 0.5]} />

      {/* Soft ambient so nothing is pitch black */}
      <ambientLight intensity={0.28} color="#e8f0ff" />

      {/* Room-lit accents */}
      <pointLight position={[-15, 3, 15]} intensity={12} distance={14} color="#ffd9a0" />
      <pointLight position={[15, 3, -15]} intensity={10} distance={14} color="#bfe0d0" />
      <pointLight position={[0, 3.4, 0]} intensity={14} distance={16} color="#ffe6bd" />

      {/* Contact shadows grounding the whole scene */}
      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.5}
        scale={60}
        blur={2.2}
        far={9}
        resolution={quality === 'high' ? 1024 : 512}
        color="#000000"
      />

      {/* Realistic reflections for glass/metal */}
      <Environment preset="city" environmentIntensity={0.35} />
    </>
  )
}
