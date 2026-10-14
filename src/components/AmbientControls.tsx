import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react'

/**
 * Small ambient control cluster in the bottom-right corner, mirroring the
 * reference: a brightness toggle, a (muted-by-default) ambience toggle, a
 * fullscreen control, and a subtle "Explore · Learn · Grow" reminder pill.
 * Audio stays muted by default — no autoplay.
 */
export default function AmbientControls() {
  const [bright, setBright] = useState(true)
  const [muted, setMuted] = useState(true)
  const [full, setFull] = useState(false)

  // Apply brightness as a real CSS filter on the WebGL canvas.
  useEffect(() => {
    document.body.classList.toggle('dim-scene', !bright)
  }, [bright])

  const toggleFullscreen = () => {
    const el = document.documentElement
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setFull(true)).catch(() => {})
    } else {
      document.exitFullscreen?.().then(() => setFull(false)).catch(() => {})
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
      {/* Reminder pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#26343D] bg-[#0d151b]/80 px-3.5 py-1.5 text-[11px] text-text-secondary shadow-panel backdrop-blur-md"
      >
        <span className="text-gold">Explore</span>
        <span className="text-[#35454f]">•</span>
        <span className="text-gold">Learn</span>
        <span className="text-[#35454f]">•</span>
        <span className="text-gold">Grow</span>
      </motion.div>

      {/* Icon buttons */}
      <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-[#26343D] bg-[#0d151b]/80 p-1.5 shadow-panel backdrop-blur-md">
        <IconBtn
          onClick={() => setBright((b) => !b)}
          active={bright}
          label="Toggle brightness"
        >
          <Sun size={16} />
        </IconBtn>
        <IconBtn
          onClick={() => setMuted((m) => !m)}
          active={!muted}
          label={muted ? 'Unmute ambience' : 'Mute ambience'}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </IconBtn>
        <IconBtn onClick={toggleFullscreen} active={full} label="Toggle fullscreen">
          {full ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </IconBtn>
      </div>
    </div>
  )
}

function IconBtn({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void
  active: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
        active
          ? 'bg-gold/15 text-gold'
          : 'text-text-secondary hover:bg-white/5 hover:text-gold'
      }`}
    >
      {children}
    </button>
  )
}
