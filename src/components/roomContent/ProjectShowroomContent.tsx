import { ExternalLink, Github, ImageOff } from 'lucide-react'
import { projects } from '../../data/projects'

export function ProjectShowroomContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-text-secondary">
        A showcase of five real projects I have designed, built, and deployed.
        Each one links to its live destination so you can explore it directly.
      </p>

      <div className="space-y-3">
        {projects.map((p) => (
          <article
            key={p.id}
            className="overflow-hidden rounded-lg border border-[#26343D] bg-[#0B1115]/50"
          >
            {/* Preview */}
            <div
              className="flex h-24 items-center justify-center border-b border-[#26343D]"
              style={{
                background: p.previewVerified
                  ? `linear-gradient(135deg, ${p.accent}22, #101C25)`
                  : 'linear-gradient(135deg, #16222b, #101C25)',
              }}
            >
              {p.previewVerified ? (
                <div className="text-center">
                  <div
                    className="mx-auto mb-1 h-2 w-16 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <span className="text-[11px] uppercase tracking-widest text-text-secondary">
                    {p.title}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-text-secondary/60">
                  <ImageOff size={20} />
                  <span className="text-[10px]">Preview unavailable</span>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="space-y-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">{p.title}</h4>
                  <p className="text-[11px] text-gold">{p.tagline}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-text-secondary">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#26343D] px-2 py-0.5 text-[10px] text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={p.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 text-xs"
                >
                  <ExternalLink size={13} /> View Live
                </a>
                {p.links.repo && (
                  <a
                    href={p.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs"
                    aria-label={`${p.title} repository`}
                  >
                    <Github size={13} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
