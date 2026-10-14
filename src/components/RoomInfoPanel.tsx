import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useOffice } from '../office/OfficeContext'
import { rooms } from '../data/rooms'
import { ReceptionContent } from './roomContent/ReceptionContent'
import { DevelopmentStudioContent } from './roomContent/DevelopmentStudioContent'
import { AnalyticsLabContent } from './roomContent/AnalyticsLabContent'
import { ProjectShowroomContent } from './roomContent/ProjectShowroomContent'
import { MeetingRoomContent } from './roomContent/MeetingRoomContent'
import { EducationCornerContent } from './roomContent/EducationCornerContent'
import { ContactLoungeContent } from './roomContent/ContactLoungeContent'
import { OwnersCabinContent } from './roomContent/OwnersCabinContent'
import ContactForm from './ContactForm'
import CVViewer from './CVViewer'
import { useState } from 'react'
import type { RoomId } from '../types'

/**
 * The information panel that appears when a room is active. On desktop it docks
 * to the right; on mobile it becomes a bottom sheet. Includes an integrated CV
 * viewer modal.
 */
export default function RoomInfoPanel() {
  const { active, goOverview } = useOffice()
  const [cvOpen, setCvOpen] = useState(false)
  const open = active !== 'home'
  const room = open ? rooms.find((r) => r.id === active) : undefined

  return (
    <>
      <AnimatePresence>
        {open && room && (
          <motion.section
            key={active}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            aria-label={`${room.name} information`}
            className={
              // Desktop: docked panel. Mobile: bottom sheet.
              'fixed z-30 ' +
              'inset-x-0 bottom-0 max-h-[62vh] ' +
              'md:inset-x-auto md:bottom-6 md:right-6 md:top-24 md:max-h-[calc(100vh-8rem)] md:w-[380px]'
            }
          >
            <div className="glass-panel flex h-full max-h-[inherit] flex-col overflow-hidden rounded-b-none md:rounded-card">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#26343D] px-4 py-3">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-base font-bold uppercase tracking-wide text-text-primary">
                    {room.name}
                  </h2>
                  <p className="truncate text-[11px] text-gold">{room.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={goOverview}
                  className="shrink-0 rounded-md p-1.5 text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
                  aria-label="Close panel and return to overview"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="scroll-thin flex-1 space-y-4 overflow-y-auto px-4 py-4">
                <RoomContent id={room.id} onViewCV={() => setCvOpen(true)} />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {cvOpen && <CVViewer onClose={() => setCvOpen(false)} />}
    </>
  )
}

function RoomContent({
  id,
  onViewCV,
}: {
  id: RoomId
  onViewCV: () => void
}) {
  switch (id) {
    case 'reception':
      return <ReceptionContent />
    case 'development':
      return <DevelopmentStudioContent />
    case 'analytics':
      return <AnalyticsLabContent />
    case 'showroom':
      return <ProjectShowroomContent />
    case 'meeting':
      return <MeetingRoomContent />
    case 'education':
      return <EducationCornerContent />
    case 'contact':
      return (
        <div className="space-y-5">
          <ContactLoungeContent />
          <div className="border-t border-[#26343D] pt-4">
            <div className="section-label mb-3">Send a Message</div>
            <ContactForm />
          </div>
        </div>
      )
    case 'owners':
      return <OwnersCabinContentWithCV onViewCV={onViewCV} />
    default:
      return null
  }
}

// Owner's cabin uses the shared content; onViewCV kept for future inline button.
function OwnersCabinContentWithCV({ onViewCV }: { onViewCV: () => void }) {
  void onViewCV
  return <OwnersCabinContent />
}
