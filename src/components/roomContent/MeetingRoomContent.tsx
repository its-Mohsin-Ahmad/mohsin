import { useOffice } from '../../office/OfficeContext'
import { areasOfInterest } from '../../data/skills'

export function MeetingRoomContent() {
  const { navigateTo } = useOffice()
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-text-secondary">
        Let's build something great together. I enjoy collaborating on frontend
        interfaces, responsive design, and turning data into clear dashboards.
        If you have a project in mind, I'd love to hear about it.
      </p>

      <div>
        <div className="section-label mb-3">Areas of Interest</div>
        <div className="grid grid-cols-2 gap-2">
          {areasOfInterest.map((a) => (
            <div
              key={a}
              className="rounded-lg border border-[#26343D] bg-[#0B1115]/50 px-3 py-2.5 text-xs text-text-secondary"
            >
              {a}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary flex-1 text-xs" onClick={() => navigateTo('contact')}>
          Contact Me
        </button>
        <button type="button" className="btn-ghost flex-1 text-xs" onClick={() => navigateTo('showroom')}>
          Explore Projects
        </button>
      </div>
    </div>
  )
}
