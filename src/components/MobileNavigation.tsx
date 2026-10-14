import { Menu, RotateCcw, Eye, EyeOff } from 'lucide-react'
import Monogram from './Monogram'
import { getIcon } from './icons'
import { navigation } from '../data/navigation'
import { useOffice } from '../office/OfficeContext'

/**
 * Mobile top navigation: brand, a menu button (opens the sidebar drawer), and
 * quick room icons. Kept compact and touch-friendly.
 */
export default function MobileNavigation({
  openDrawer,
}: {
  openDrawer: () => void
}) {
  const { active, navigateTo, goOverview, labelsVisible, toggleLabels } =
    useOffice()

  return (
    <div className="fixed inset-x-0 top-0 z-30 md:hidden">
      <div className="flex items-center gap-3 border-b border-[#26343D] bg-sidebar/95 px-3 py-2.5 backdrop-blur-md">
        <button
          type="button"
          onClick={openDrawer}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
        >
          <Menu size={20} />
        </button>
        <Monogram size={32} />
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-xs font-bold text-text-primary">
            MOHSIN AHMAD
          </div>
          <div className="text-[9px] tracking-[0.2em] text-text-secondary">
            DIGITAL PORTFOLIO
          </div>
        </div>
        <button
          type="button"
          onClick={toggleLabels}
          aria-label={labelsVisible ? 'Hide labels' : 'Show labels'}
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
        >
          {labelsVisible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
        <button
          type="button"
          onClick={goOverview}
          aria-label="Reset view"
          className={`rounded-lg p-2 transition-colors hover:bg-white/5 hover:text-gold ${
            active === 'home' ? 'text-gold' : 'text-text-secondary'
          }`}
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Quick room icon strip */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-[#26343D] bg-sidebar/90 px-3 py-2 backdrop-blur-md">
        {navigation.map((item) => {
          const Icon = getIcon(item.icon)
          const isActive = item.id === 'home' ? active === 'home' : active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => (item.id === 'home' ? goOverview() : navigateTo(item.id))}
              title={item.label}
              aria-label={item.label}
              className={`flex shrink-0 flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] transition-colors ${
                isActive
                  ? 'bg-gold/15 text-gold'
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
              }`}
            >
              <Icon size={18} />
              <span className="whitespace-nowrap">{item.label.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
