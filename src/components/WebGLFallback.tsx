import { Component, type ReactNode } from 'react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

interface State {
  hasError: boolean
}

/**
 * Error boundary around the 3D Canvas. If WebGL fails or a render error occurs,
 * this shows a polished non-3D fallback that still presents every piece of
 * portfolio content and working navigation — never a blank screen.
 */
export default class WebGLFallback extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('3D scene failed to load:', error)
  }

  render() {
    if (this.state.hasError) {
      return <StaticFallback />
    }
    return this.props.children
  }
}

/** Detect WebGL availability so we can choose the fallback proactively. */
export function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

function StaticFallback() {
  return (
    <div className="scroll-thin min-h-screen overflow-y-auto bg-bg-main px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 text-center text-sm text-text-secondary">
          {profile.headline}
        </div>
        <h1 className="mb-2 text-center font-display text-4xl font-extrabold text-text-primary">
          {profile.fullName}
        </h1>
        <p className="mb-8 text-center text-sm text-gold">{profile.location}</p>

        <div className="glass-panel mb-6 p-6">
          <h2 className="section-label mb-2">About</h2>
          <p className="text-sm leading-relaxed text-text-secondary">{profile.about}</p>
        </div>

        <div className="glass-panel mb-6 p-6">
          <h2 className="section-label mb-2">Education</h2>
          <p className="text-sm text-text-primary">{profile.education.degree}</p>
          <p className="text-sm text-text-secondary">
            {profile.education.institution} · {profile.education.period} · GPA {profile.education.gpa}
          </p>
        </div>

        <div className="glass-panel mb-6 p-6">
          <h2 className="section-label mb-3">Projects</h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <a
                key={p.id}
                href={p.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-[#26343D] p-3 transition-colors hover:border-gold/50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-primary">{p.title}</span>
                  <span className="text-[11px] text-gold">View Live →</span>
                </div>
                <p className="mt-1 text-xs text-text-secondary">{p.tagline}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="glass-panel mb-6 p-6">
          <h2 className="section-label mb-3">Contact</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href={`mailto:${profile.email}`} className="text-gold underline">{profile.email}</a>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-gold underline">GitHub</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gold underline">LinkedIn</a>
          </div>
        </div>

        <div className="text-center">
          <a href={profile.cvPath} download className="btn-primary">
            Download CV
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-text-secondary/70">
          The interactive 3D office needs WebGL, which isn't available in this browser.
          All portfolio content is shown above.
        </p>
      </div>
    </div>
  )
}
