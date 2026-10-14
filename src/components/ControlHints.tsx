import { MousePointer2, Move, Hand } from 'lucide-react'

/** Compact, unobtrusive control hints for the 3D environment. */
export default function ControlHints() {
  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-20 hidden select-none md:block">
      <div className="glass-panel flex flex-col gap-1.5 px-3 py-2.5 text-[11px] text-text-secondary">
        <Hint icon={<Move size={13} />} text="WASD / Arrows to move" />
        <Hint icon={<Hand size={13} />} text="Drag to rotate · Scroll to zoom" />
        <Hint icon={<MousePointer2 size={13} />} text="Click a room or label to visit" />
      </div>
    </div>
  )
}

function Hint({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gold">{icon}</span>
      <span>{text}</span>
    </div>
  )
}
