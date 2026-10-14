import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'
import { OfficeProvider, useOffice } from './office/OfficeContext'
import OfficeScene from './scene/OfficeScene'
import LoadingScreen from './components/LoadingScreen'
import SidebarNavigation from './components/SidebarNavigation'
import ProfilePanel from './components/ProfilePanel'
import RoomInfoPanel from './components/RoomInfoPanel'
import GuidedTour from './components/GuidedTour'
import MobileNavigation from './components/MobileNavigation'
import ControlHints from './components/ControlHints'
import WebGLFallback, { webglAvailable } from './components/WebGLFallback'

export default function App() {
  // Proactive WebGL check so we can skip the Canvas entirely when unsupported.
  const [supported, setSupported] = useState<boolean | null>(null)
  useEffect(() => {
    setSupported(webglAvailable())
  }, [])

  if (supported === null) return null // brief pre-hydration guard

  return (
    <OfficeProvider>
      {supported ? <OfficeExperience /> : <WebGLFallback>{null}</WebGLFallback>}
    </OfficeProvider>
  )
}

/** Detect a low-power / small-screen device to lower render quality. */
function useQuality(): 'high' | 'low' {
  const [quality] = useState<'high' | 'low'>(() => {
    if (typeof window === 'undefined') return 'high'
    const small = window.innerWidth < 768
    const cores = navigator.hardwareConcurrency ?? 4
    const lowMem = (navigator as { deviceMemory?: number }).deviceMemory
    return small || cores <= 4 || (lowMem !== undefined && lowMem <= 2) ? 'low' : 'high'
  })
  return quality
}

function OfficeExperience() {
  const [loading, setLoading] = useState(true)
  const [mobileDrawer, setMobileDrawer] = useState(false)
  const quality = useQuality()

  // Esc closes panels / returns to overview.
  const { goOverview } = useOffice()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileDrawer(false)
        goOverview()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goOverview])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-bg-main">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <WebGLFallback>
          <Canvas
            shadows={quality === 'high'}
            dpr={quality === 'high' ? [1, 2] : [1, 1.35]}
            camera={{ position: [40, 44, 46], fov: 42, near: 0.5, far: 400 }}
            gl={{ antialias: quality === 'high', powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <OfficeScene quality={quality} />
            </Suspense>
          </Canvas>
        </WebGLFallback>
      </div>

      {/* UI overlay */}
      <SidebarNavigation mobileOpen={mobileDrawer} setMobileOpen={setMobileDrawer} />
      <MobileNavigation openDrawer={() => setMobileDrawer(true)} />
      <ProfilePanel />
      <RoomInfoPanel />
      <ControlHints />
      <GuidedTour />

      {/* Cinematic loading screen on top until assets are ready */}
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>
    </div>
  )
}
