import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  ExternalLink,
} from 'lucide-react'
import { profile } from '../../data/profile'

/** Contact Lounge — contact details + the contact form. */
export function ContactLoungeContent() {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-text-primary">
          LET'S CONNECT
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          I'd love to hear from you. Reach me directly or send a message below.
        </p>
      </div>

      <div className="space-y-2">
        <ContactRow icon={<Mail size={15} />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
        <ContactRow icon={<Phone size={15} />} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
        <ContactRow icon={<MapPin size={15} />} label="Location" value={profile.location} />
      </div>

      <div>
        <div className="section-label mb-2">Find me online</div>
        <div className="flex gap-2">
          <SocialCard href={profile.socials.github} label="GitHub">
            <Github size={18} />
          </SocialCard>
          <SocialCard href={profile.socials.linkedin} label="LinkedIn">
            <Linkedin size={18} />
          </SocialCard>
          <SocialCard href={profile.socials.facebook} label="Facebook">
            <Facebook size={18} />
          </SocialCard>
        </div>
      </div>
    </div>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <div className="flex items-center gap-3 rounded-lg border border-[#26343D] bg-[#0B1115]/50 px-3 py-2.5">
      <span className="text-gold">{icon}</span>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-text-secondary">{label}</div>
        <div className="truncate text-xs text-text-primary">{value}</div>
      </div>
      {href && <ExternalLink size={13} className="ml-auto shrink-0 text-text-secondary" />}
    </div>
  )
  return href ? (
    <a href={href} className="block transition-colors hover:border-gold/50 [&>div]:hover:border-gold/50">
      {inner}
    </a>
  ) : (
    inner
  )
}

function SocialCard({
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
      className="flex flex-1 items-center justify-center rounded-lg border border-[#26343D] py-3 text-text-secondary transition-colors hover:border-gold/60 hover:text-gold"
    >
      {children}
    </a>
  )
}
