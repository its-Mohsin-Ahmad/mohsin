import { useState } from 'react'
import { Code2, Terminal, Braces } from 'lucide-react'
import { frontendSkills } from '../../data/skills'

const codeSample = `import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}`

export function DevelopmentStudioContent() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-text-secondary">
        My Development Studio is where ideas become responsive interfaces. I
        build with semantic HTML, modern CSS, and JavaScript — reaching for
        React when a project benefits from reusable, component-based
        architecture.
      </p>

      {/* Code editor mock */}
      <div className="overflow-hidden rounded-lg border border-[#26343D] bg-[#0a0f13]">
        <div className="flex items-center gap-1.5 border-b border-[#26343D] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 flex items-center gap-1.5 text-[11px] text-text-secondary">
            <Braces size={12} /> Counter.jsx
          </span>
        </div>
        <pre className="scroll-thin overflow-x-auto px-3 py-3 text-[11px] leading-relaxed">
          <code className="font-mono text-[#a9dcff]">
            {codeSample.split('\n').map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-3 inline-block w-4 select-none text-right text-text-secondary/40">
                  {i + 1}
                </span>
                <span>{line || ' '}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Technologies */}
      <div>
        <div className="section-label mb-3 flex items-center gap-2">
          <Terminal size={13} /> Technologies
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {frontendSkills.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setOpen(open === s.name ? null : s.name)}
              className={`rounded-lg border px-3 py-2 text-left text-xs transition-all ${
                open === s.name
                  ? 'border-gold/70 bg-gold/10 text-gold'
                  : 'border-[#26343D] bg-[#0B1115]/50 text-text-secondary hover:border-gold/40 hover:text-text-primary'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        {open && (
          <div className="mt-3 rounded-lg border border-gold/30 bg-gold/5 p-3 text-xs leading-relaxed text-text-secondary animate-fade-in">
            <span className="font-semibold text-gold">{open}: </span>
            {frontendSkills.find((s) => s.name === open)?.detail}
          </div>
        )}
      </div>
    </div>
  )
}
