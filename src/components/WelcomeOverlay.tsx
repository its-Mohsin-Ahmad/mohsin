import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Footprints, Download } from 'lucide-react'
import { useOffice } from '../office/OfficeContext'
import { profile } from '../data/profile'

/**
 * Welcome overlay shown on the home / overview state. Mirrors the reference:
 * a bottom-left "WELCOME TO MY DIGITAL OFFICE" hero with three functional
 * actions (enter office, start guided tour, download CV). It hides itself as
 * soon as the visitor navigates into a room so it never blocks content.
 */
export default function WelcomeOverlay({ ready }: { ready: boolean }) {
  const { isOverview, navigateTo, requestTour } = useOffice()
  const show = ready && isOverview

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={
            'fixed z-20 ' +
            // Desktop: sit just right of the sidebar, near the bottom.
            'bottom-6 left-[276px] ' +
            // Mobile: full width above the bottom edge.
            'max-md:inset-x-4 max-md:left-4 max-md:bottom-4 ' +
            'w-[min(460px,calc(100vw-3rem))] max-md:w-auto'
          }
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Welcome
            </span>

            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-4xl">
              WELCOME TO MY{' '}
              <span className="bg-gradient-to-r from-gold-soft via-gold to-gold-deep bg-clip-text text-transparent">
                DIGITAL OFFICE
              </span>
            </h1>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              Explore my development workspace, analytics lab, projects,
              education, and professional journey through an interactive 3D
              experience.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <button
                type="button"
                className="btn-primary text-sm"
                onClick={() => navigateTo('reception')}
              >
                Enter My Office <ArrowRight size={15} />
              </button>
              <button
                type="button"
                className="btn-ghost text-sm"
                onClick={requestTour}
              >
                <Footprints size={15} /> Start Guided Tour
              </button>
              <a href={profile.cvPath} download className="btn-ghost text-sm">
                <Download size={15} /> Download CV
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

