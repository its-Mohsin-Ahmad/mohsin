import { AnimatePresence, motion } from 'framer-motion'
import {
  Minimize2,
  Maximize2,
  X,
  MapPin,
  GraduationCap,
  Download,
  Github,
  Linkedin,
  Facebook,
  ExternalLink,
} from 'lucide-react'
import Monogram from './Monogram'
import { profile } from '../data/profile'
import { frontendSkills } from '../data/skills'
import { useOffice } from '../office/OfficeContext'

/**
 * Premium profile panel anchored to the upper-right of the desktop screen.
 * Supports minimize / close and shows accurate personal information.
 */
export default function ProfilePanel() {
  const {
    profileMinimized,
    setProfileMinimized,
    profileClosed,
    setProfileClosed,
  } = useOffice()

  return (
    <AnimatePresence>
      {!profileClosed && (
        <motion.aside
          key="profile"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed right-4 top-4 z-30 w-[320px] max-w-[calc(100vw-2rem)]"
        >
          <div className="glass-panel overflow-hidden">
            <div className="flex items-start gap-3 p-4">
              <div className="shrink-0">
                <Monogram size={56} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-lg font-bold text-text-primary">
                  {profile.fullName}
                </h2>
                <p className="mt-0.5 text-xs leading-snug text-gold">
                  {profile.headline}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => setProfileMinimized(!profileMinimized)}
                  className="rounded-md p-1.5 text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
                  aria-label={profileMinimized ? 'Expand profile' : 'Minimize profile'}
                >
                  {profileMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => setProfileClosed(true)}
                  className="rounded-md p-1.5 text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
                  aria-label="Close profile"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {!profileMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="scroll-thin max-h-[52vh] space-y-4 overflow-y-auto px-4 pb-4">
                    <p className="text-xs leading-relaxed text-text-secondary">
                      {profile.about}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <GraduationCap size={14} className="text-gold" />
                        <span>
                          {profile.education.degree} · {profile.education.gpa}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-text-secondary">
                        <MapPin size={14} className="text-gold" />
                        <span>{profile.location}</span>
                      </div>
                    </div>

                    <div>
                      <div className="section-label mb-2">Core Skills</div>
                      <div className="flex flex-wrap gap-1.5">
                        {frontendSkills.slice(0, 6).map((s) => (
                          <span
                            key={s.name}
                            className="rounded-full border border-[#26343D] bg-[#0B1115]/50 px-2.5 py-1 text-[11px] text-text-secondary"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a href={profile.cvPath} download className="btn-primary flex-1 text-xs">
                        <Download size={14} /> Download CV
                      </a>
                      <a
                        href={profile.cvPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost flex-1 text-xs"
                      >
                        <ExternalLink size={14} /> View CV
                      </a>
                    </div>

                    <div className="flex gap-2 border-t border-[#26343D] pt-3">
                      <SocialLink href={profile.socials.github} label="GitHub">
                        <Github size={16} />
                      </SocialLink>
                      <SocialLink href={profile.socials.linkedin} label="LinkedIn">
                        <Linkedin size={16} />
                      </SocialLink>
                      <SocialLink href={profile.socials.facebook} label="Facebook">
                        <Facebook size={16} />
                      </SocialLink>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="flex flex-1 items-center justify-center rounded-lg border border-[#26343D] py-2 text-text-secondary transition-colors hover:border-gold/60 hover:text-gold"
    >
      {children}
    </a>
  )
}

