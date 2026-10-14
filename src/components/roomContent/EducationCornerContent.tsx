import { GraduationCap } from 'lucide-react'
import { profile } from '../../data/profile'
import { learningTimeline } from '../../data/skills'

export function EducationCornerContent() {
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-gold/30 bg-gold/5 p-4 text-center">
        <GraduationCap size={26} className="mx-auto mb-2 text-gold" />
        <h4 className="font-display text-base font-bold text-text-primary">
          {profile.education.institution}
        </h4>
        <p className="mt-1 text-xs text-text-secondary">{profile.education.degree}</p>
        <div className="mt-2 flex items-center justify-center gap-3 text-[11px] text-text-secondary">
          <span>{profile.education.period}</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span className="text-gold">GPA: {profile.education.gpa}</span>
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-widest text-text-secondary/70">
          Ongoing
        </p>
      </div>

      <div>
        <div className="section-label mb-3">Learning Journey</div>
        <ol className="relative space-y-3 border-l border-[#26343D] pl-4">
          {learningTimeline.map((t) => (
            <li key={t.title} className="relative">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[#0B1115] bg-gold" />
              <div className="text-xs font-semibold text-text-primary">{t.title}</div>
              <p className="text-[11px] leading-relaxed text-text-secondary">{t.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
