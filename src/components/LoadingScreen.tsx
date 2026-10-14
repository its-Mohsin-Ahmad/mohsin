import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useProgress } from '@react-three/drei'
import Monogram from './Monogram'
import { profile } from '../data/profile'

/**
 * Cinematic loading screen. Shows real asset-loading progress (from Drei's
 * useProgress) blended with a short minimum display time, plus a Skip control.
 */
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { progress, active } = useProgress()
  const [display, setDisplay] = useState(0)
  const [minElapsed, setMinElapsed] = useState(false)

  // Smooth the displayed percentage toward the real progress.
  useEffect(() => {
    let raf = 0
    const tick = () => {
      setDisplay((d) => {
        const target = Math.max(progress, active ? d : 100)
        return d + (target - d) * 0.12
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progress, active])

  // Minimum cinematic duration so the intro doesn't flash.
  useEffect(() => {
    const t = setTimeout(() => setMinElapsed(true), 1400)
    return () => clearTimeout(t)
  }, [])

  // Finish when the smoothed bar is full AND minimum time elapsed.
  useEffect(() => {
    if (minElapsed && display >= 99) {
      const t = setTimeout(onDone, 450)
      return () => clearTimeout(t)
    }
  }, [minElapsed, display, onDone])

  // Safety: never get stuck. Force done after 6s.
  useEffect(() => {
    const t = setTimeout(onDone, 6000)
    return () => clearTimeout(t)
  }, [onDone])

  const pct = Math.min(100, Math.round(display))

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F12] px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(217,174,99,0.10), transparent 60%)',
        }}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative flex flex-col items-center"
      >
        <Monogram size={84} className="mb-6 drop-shadow-[0_0_25px_rgba(217,174,99,0.35)]" />

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          {profile.fullName.toUpperCase()}
        </h1>
        <p className="mt-2 text-center text-sm text-text-secondary">
          {profile.roles.join('  •  ')}
        </p>

        <div className="mt-10 w-64 sm:w-80">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[#1a232a]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
              animate={{ width: `${pct}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[11px] tracking-[0.2em] text-text-secondary">
            <span>PREPARING YOUR DIGITAL WORKSPACE...</span>
            <span className="tabular-nums text-gold">{pct}%</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-text-secondary/70">
          Loading the environment. Preparing your experience.
        </p>

        <button
          type="button"
          onClick={onDone}
          className="mt-8 rounded-full border border-[#26343D] px-5 py-2 text-xs text-text-secondary transition-colors hover:border-gold/60 hover:text-gold"
        >
          Skip Intro
        </button>
      </motion.div>
    </motion.div>
  )
}
