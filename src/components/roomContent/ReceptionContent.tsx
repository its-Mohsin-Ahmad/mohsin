import { Compass, User, Play } from 'lucide-react'
import { useOffice } from '../../office/OfficeContext'

/** Reception — the welcome / home content. */
export function ReceptionContent() {
  const { navigateTo } = useOffice()
  return (
    <div className="space-y-4 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold">
          Reception
        </span>
      </div>
      <h3 className="font-display text-xl font-bold text-text-primary">
        WELCOME TO MY DIGITAL OFFICE
      </h3>
      <p className="mx-auto max-w-sm text-sm leading-relaxed text-text-secondary">
        Step into my workspace and discover the projects, skills, and learning
        journey behind my digital portfolio.
      </p>
      <div className="flex flex-col gap-2 pt-1 sm:flex-row">
        <button type="button" className="btn-primary flex-1 text-xs" onClick={() => navigateTo('development')}>
          <Compass size={14} /> Explore the Office
        </button>
        <button type="button" className="btn-ghost flex-1 text-xs" onClick={() => navigateTo('owners')}>
          <User size={14} /> View My Profile
        </button>
      </div>
    </div>
  )
}
