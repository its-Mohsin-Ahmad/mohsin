import { AnimatePresence, motion } from 'framer-motion'
import {
  Minimize2,
  Maximize2,
  X,
  MapPin,
  GraduationCap,
  Download,
  Sparkles,
  UserRound,
  Github,
  Linkedin,
  Facebook,
} from 'lucide-react'
import Monogram from './Monogram'
import { profile } from '../data/profile'
import { useOffice } from '../office/OfficeContext'

/**
 * Premium profile panel anchored to the upper-right of the desktop screen.
 * Mirrors the reference: circular avatar, icon-labelled rows (Education,
 * Location, Specialties), and Download CV + View Full Profile actions.
 * Supports minimize / close and shows accurate personal information.
 */
export default function ProfilePanel() {
  const {
    profileMinimized,
    setProfileMinimized,
    profileClosed,
    setProfileClosed,
    navigateTo,
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
          className="fixed right-4 top-4 z-30 w-[330px] max-w-[calc(100vw-2rem)]"
        >
          <div className="glass-panel relative overflow-hidden">
            <div className="flex items-start gap-3 p-4 pr-2">
              <div className="shrink-0">
                <Monogram size={58} round />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <h2 className="font-display text-lg font-bold text-text-primary">
                  {profile.fullName}
                </h2>
                <p className="mt-0.5 text-[11px] font-medium leading-snug text-gold">
                  Software Engineering Student &amp; Frontend Developer
                </p>
              </div>
              <button
                type="button"
                onClick={() => setProfileClosed(true)}
                className="shrink-0 rounded-md p-1 text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
                aria-label="Close profile"
              >
                <X size={16} />
              </button>
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
                  <div className="scroll-thin max-h-[54vh] space-y-3.5 overflow-y-auto px-4 pb-3">
                    <p className="text-xs leading-relaxed text-text-secondary">
                      I&apos;m a passionate software engineering student focused
                      on building modern web applications, creating responsive
                      interfaces, and working with data-analysis tools like
                      Excel and Power BI.
                    </p>

                    <InfoRow icon={<GraduationCap size={15} className="text-gold" />}>
                      <div className="font-medium text-text-primary">Education</div>
                      <div className="text-[11px] leading-snug text-text-secondary">
                        {profile.education.institution}
                        <br />
                        {profile.education.degree} ({profile.education.period})
                      </div>
                    </InfoRow>

                    <InfoRow icon={<MapPin size={15} className="text-gold" />}>
                      <div className="font-medium text-text-primary">Location</div>
                      <div className="text-[11px] text-text-secondary">
                        {profile.location}
                      </div>
                    </InfoRow>

                    <InfoRow icon={<Sparkles size={15} className="text-gold" />}>
                      <div className="font-medium text-text-primary">Specialties</div>
                      <div className="text-[11px] text-text-secondary">
                        Frontend, Excel, Power BI
                      </div>
                    </InfoRow>

                    <div className="flex flex-col gap-2 pt-1">
                      <a
                        href={profile.cvPath}
                        download
                        className="btn-primary w-full text-xs"
                      >
                        <Download size={14} /> Download CV
                      </a>
                      <button
                        type="button"
                        className="btn-ghost w-full text-xs"
                        onClick={() => navigateTo('owners')}
                      >
                        <UserRound size={14} /> View Full Profile
                      </button>
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

            {/* Minimize / restore control */}
            <div className="flex justify-end px-3 pb-2">
              <button
                type="button"
                onClick={() => setProfileMinimized(!profileMinimized)}
                className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
                aria-label={profileMinimized ? 'Expand profile' : 'Minimize profile'}
              >
                {profileMinimized ? (
                  <>
                    <Maximize2 size={13} /> Expand
                  </>
                ) : (
                  <>
                    <Minimize2 size={13} /> Minimize
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function InfoRow({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">{children}</div>
    </div>
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

