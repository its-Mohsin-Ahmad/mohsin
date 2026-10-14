import {
  GraduationCap,
  Download,
  ExternalLink,
  Briefcase,
  BarChart3,
  FolderOpen,
  Mail,
  Github,
  Linkedin,
  Facebook,
} from 'lucide-react'
import { profile } from '../../data/profile'
import { frontendSkills, analyticsSkills, developmentTools } from '../../data/skills'
import { projects } from '../../data/projects'
import { useOffice } from '../../office/OfficeContext'

/** Owner's Cabin — the full professional profile. */
export function OwnersCabinContent() {
  const { navigateTo } = useOffice()
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-text-primary">
          THE PERSON BEHIND THE PROJECTS
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
          {profile.about}
        </p>
      </div>

      {/* Education */}
      <Section icon={<GraduationCap size={14} />} title="Education">
        <div className="rounded-lg border border-[#26343D] bg-[#0B1115]/50 p-3 text-xs">
          <div className="font-semibold text-text-primary">{profile.education.degree}</div>
          <div className="text-text-secondary">{profile.education.institution}</div>
          <div className="mt-1 flex gap-3 text-text-secondary">
            <span>{profile.education.period}</span>
            <span className="text-gold">GPA: {profile.education.gpa}</span>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section icon={<Briefcase size={14} />} title="Skills">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {frontendSkills.map((s) => (
              <Tag key={s.name}>{s.name}</Tag>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analyticsSkills.map((s) => (
              <Tag key={s.name} gold>
                {s.name}
              </Tag>
            ))}
          </div>
        </div>
      </Section>

      {/* Dev tools */}
      <Section icon={<Briefcase size={14} />} title="Development Tools">
        <div className="flex flex-wrap gap-1.5">
          {developmentTools.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>

      {/* Projects summary */}
      <Section icon={<FolderOpen size={14} />} title="Selected Projects">
        <div className="grid grid-cols-1 gap-1.5">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-[#26343D] bg-[#0B1115]/50 px-3 py-2 text-xs text-text-secondary transition-colors hover:border-gold/50 hover:text-text-primary"
            >
              <span className="font-medium text-text-primary">{p.title}</span>
              <span className="flex items-center gap-1 text-[10px]">
                Live <ExternalLink size={11} />
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 border-t border-[#26343D] pt-4">
        <a href={profile.cvPath} download className="btn-primary flex-1 text-xs">
          <Download size={14} /> Download CV
        </a>
        <a href={profile.cvPath} target="_blank" rel="noopener noreferrer" className="btn-ghost flex-1 text-xs">
          <ExternalLink size={14} /> View CV
        </a>
        <button type="button" className="btn-ghost flex-1 text-xs" onClick={() => navigateTo('showroom')}>
          <FolderOpen size={14} /> Projects
        </button>
        <button type="button" className="btn-ghost flex-1 text-xs" onClick={() => navigateTo('contact')}>
          <Mail size={14} /> Contact
        </button>
      </div>

      {/* Socials */}
      <div className="flex gap-2">
        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-mini"><Github size={16} /></a>
        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-mini"><Linkedin size={16} /></a>
        <a href={profile.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-mini"><Facebook size={16} /></a>
      </div>
    </div>
  )
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="section-label mb-2 flex items-center gap-1.5">
        <span className="text-gold">{icon}</span> {title}
      </div>
      {children}
    </div>
  )
}

function Tag({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] ${
        gold
          ? 'border-gold/30 bg-gold/5 text-gold'
          : 'border-[#26343D] bg-[#0B1115]/50 text-text-secondary'
      }`}
    >
      {children}
    </span>
  )
}
