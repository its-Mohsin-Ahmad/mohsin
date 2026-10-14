import { BarChart3 } from 'lucide-react'
import { analyticsSkills } from '../../data/skills'

/** Small, self-contained SVG chart pieces for the analytics lab demo. */
function BarChart() {
  const data = [
    { label: 'Q1', v: 40 },
    { label: 'Q2', v: 65 },
    { label: 'Q3', v: 52 },
    { label: 'Q4', v: 88 },
  ]
  return (
    <svg viewBox="0 0 200 110" className="h-full w-full">
      {[0, 25, 50, 75, 100].map((g) => (
        <line key={g} x1="24" x2="200" y1={100 - g} y2={100 - g} stroke="#26343D" strokeWidth="0.5" />
      ))}
      {data.map((d, i) => (
        <g key={d.label}>
          <rect x={38 + i * 42} y={100 - d.v} width="24" height={d.v} rx="2" fill="#D9AE63" opacity="0.85" />
          <text x={50 + i * 42} y={108} fill="#AAB4BD" fontSize="8" textAnchor="middle">{d.label}</text>
        </g>
      ))}
    </svg>
  )
}

function LineChart() {
  const pts = [20, 45, 35, 60, 55, 80, 72].map((y, i) => `${30 + i * 24},${100 - y}`)
  return (
    <svg viewBox="0 0 200 110" className="h-full w-full">
      <line x1="24" x2="200" y1="100" y2="100" stroke="#26343D" strokeWidth="0.5" />
      <polyline points={pts.join(' ')} fill="none" stroke="#7FC8A9" strokeWidth="2" />
      {pts.map((p, i) => {
        const [x, y] = p.split(',')
        return <circle key={i} cx={x} cy={y} r="2" fill="#7FC8A9" />
      })}
    </svg>
  )
}

function DonutChart() {
  return (
    <svg viewBox="0 0 200 110" className="h-full w-full">
      <circle cx="100" cy="55" r="34" fill="none" stroke="#26343D" strokeWidth="14" />
      <circle
        cx="100" cy="55" r="34" fill="none" stroke="#D9AE63" strokeWidth="14"
        strokeDasharray="150 214" strokeLinecap="round" transform="rotate(-90 100 55)"
      />
      <text x="100" y="59" fill="#F4F0E7" fontSize="14" fontWeight="700" textAnchor="middle">70%</text>
    </svg>
  )
}

export function AnalyticsLabContent() {
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-text-secondary">
        The Analytics Lab is where I turn raw data into clear visual insight.
        Using Microsoft Excel and Power BI, I clean data, build PivotTables, and
        design dashboards that make patterns easy to see.
      </p>

      {/* Sample dashboard with clearly labelled demo data */}
      <div className="rounded-lg border border-[#26343D] bg-[#0B1115]/60 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="section-label flex items-center gap-1.5">
            <BarChart3 size={13} /> Sample Dashboard
          </span>
          <span className="rounded border border-[#26343D] px-1.5 py-0.5 text-[10px] text-text-secondary">
            Demo data
          </span>
        </div>

        {/* KPI cards */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { k: 'Records', v: '1,240' },
            { k: 'Categories', v: '6' },
            { k: 'Growth', v: '+18%' },
          ].map((c) => (
            <div key={c.k} className="rounded-md border border-[#26343D] bg-[#101C25] p-2">
              <div className="text-[10px] text-text-secondary">{c.k}</div>
              <div className="text-sm font-bold text-gold">{c.v}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md border border-[#26343D] bg-[#101C25] p-2">
            <div className="mb-1 text-[10px] text-text-secondary">Bar</div>
            <div className="h-16"><BarChart /></div>
          </div>
          <div className="rounded-md border border-[#26343D] bg-[#101C25] p-2">
            <div className="mb-1 text-[10px] text-text-secondary">Line</div>
            <div className="h-16"><LineChart /></div>
          </div>
          <div className="rounded-md border border-[#26343D] bg-[#101C25] p-2">
            <div className="mb-1 text-[10px] text-text-secondary">Donut</div>
            <div className="h-16"><DonutChart /></div>
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <div>
        <div className="section-label mb-3">Analytics Toolkit</div>
        <div className="grid grid-cols-2 gap-2">
          {analyticsSkills.map((s) => (
            <div
              key={s.name}
              className="rounded-lg border border-[#26343D] bg-[#0B1115]/50 px-3 py-2 text-xs text-text-secondary"
            >
              {s.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
