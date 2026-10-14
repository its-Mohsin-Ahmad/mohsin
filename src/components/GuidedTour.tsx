import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, X, Footprints } from 'lucide-react'
import { tourOrder } from '../data/rooms'
import { tourCopy } from '../data/navigation'
import { useOffice } from '../office/OfficeContext'

/**
 * Optional guided tour. Steps through all eight rooms with camera moves, room
 * highlighting, and concise explanations. Fully interruptible — the user can
 * pause, step, skip, or exit at any time and explore freely.
 */
export default function GuidedTour() {
  const { active, navigateTo, tourRequest } = useOffice()
  const [running, setRunning] = useState(false)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(tourOrder.length - 1, i))
      setIndex(clamped)
      navigateTo(tourOrder[clamped])
    },
    [navigateTo],
  )

  const next = useCallback(() => {
    setIndex((i) => {
      const ni = i + 1
      if (ni >= tourOrder.length) {
        setRunning(false)
        return i
      }
      navigateTo(tourOrder[ni])
      return ni
    })
  }, [navigateTo])

  const prev = useCallback(() => {
    setIndex((i) => {
      const pi = Math.max(0, i - 1)
      navigateTo(tourOrder[pi])
      return pi
    })
  }, [navigateTo])

  const start = useCallback(() => {
    setRunning(true)
    setPaused(false)
    setIndex(0)
    navigateTo(tourOrder[0])
  }, [navigateTo])

  const exit = useCallback(() => setRunning(false), [])

  // Allow external triggers (Welcome overlay "Start Guided Tour") to start it.
  useEffect(() => {
    if (tourRequest > 0) {
      start()
    }
  }, [tourRequest, start])

  // Auto-advance every 7s while running and not paused.
  useEffect(() => {
    if (!running || paused) return
    const t = setTimeout(next, 7000)
    return () => clearTimeout(t)
  }, [running, paused, next, active, index])

  if (!running) {
    return (
      <button
        type="button"
        onClick={start}
        className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-gold/50 bg-[#101C25]/90 px-4 py-2.5 text-xs font-medium text-gold shadow-panel backdrop-blur-md transition-colors hover:bg-gold/10"
      >
        <Footprints size={15} /> Start Guided Tour
      </button>
    )
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-1/2 z-40 w-[min(92vw,560px)] -translate-x-1/2"
    >
      <div className="glass-panel overflow-hidden">
        <div className="flex items-start gap-3 border-b border-[#26343D] px-4 py-3">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Footprints size={15} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              Guided Tour · {index + 1}/{tourOrder.length}
            </span>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-1 text-xs leading-relaxed text-text-secondary"
              >
                {tourCopy[active as keyof typeof tourCopy] ?? tourCopy.reception}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 px-3 py-2.5">
          <div className="flex items-center gap-1">
            <TourBtn onClick={prev} label="Previous" disabled={index === 0}>
              <SkipBack size={16} />
            </TourBtn>
            <TourBtn onClick={() => setPaused((p) => !p)} label={paused ? 'Resume' : 'Pause'}>
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </TourBtn>
            <TourBtn onClick={next} label="Next" disabled={index >= tourOrder.length - 1}>
              <SkipForward size={16} />
            </TourBtn>
            <TourBtn
              onClick={() => {
                setRunning(false)
                navigateTo(tourOrder[tourOrder.length - 1])
              }}
              label="Skip"
            >
              Skip
            </TourBtn>
          </div>
          <button
            type="button"
            onClick={exit}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
          >
            <X size={14} /> Exit
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 pb-2.5">
          {tourOrder.map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to tour step ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-gold' : 'w-1.5 bg-[#26343D] hover:bg-text-secondary'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function TourBtn({
  onClick,
  label,
  children,
  disabled,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className="flex items-center gap-1 rounded-lg border border-[#26343D] px-2.5 py-1.5 text-xs text-text-secondary transition-colors enabled:hover:border-gold/50 enabled:hover:text-gold disabled:opacity-40"
    >
      {children}
    </button>
  )
}
