import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, RotateCcw, Eye, EyeOff } from 'lucide-react'
import Monogram from './Monogram'
import { getIcon } from './icons'
import { navigation } from '../data/navigation'
import { useOffice } from '../office/OfficeContext'

/**
 * Persistent dark left sidebar: MA logo, wordmark, collapse toggle, and the
 * eight room navigation entries. On mobile it becomes a slide-in drawer.
 */
export default function SidebarNavigation({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  const [collapsed, setCollapsed] = useState(false)
  const { active, navigateTo, goOverview, labelsVisible, toggleLabels } =
    useOffice()

  const width = collapsed ? 'w-[76px]' : 'w-[248px]'

  const content = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-4">
        <Monogram size={collapsed ? 38 : 44} />
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate font-display text-sm font-bold tracking-wide text-text-primary">
              MOHSIN AHMAD
            </div>
            <div className="text-[10px] tracking-[0.25em] text-text-secondary">
              DIGITAL PORTFOLIO
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-2 scroll-thin">
        {navigation.map((item) => {
          const Icon = getIcon(item.icon)
          const isActive =
            item.id === 'home' ? active === 'home' : active === item.id
          return (
            <button
              key={item.id}
              type="button"
              title={item.label}
              onClick={() => {
                if (item.id === 'home') goOverview()
                else navigateTo(item.id)
                setMobileOpen(false)
              }}
              className={`nav-item w-full ${isActive ? 'active' : ''}`}
            >
              <span
                className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-gold transition-all duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <Icon size={19} className="shrink-0" />
              {!collapsed && (
                <span className="truncate text-left">{item.label}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer controls */}
      <div className="space-y-1 border-t border-[#26343D] px-3 py-3">
        <button
          type="button"
          onClick={goOverview}
          className="nav-item w-full"
          title="Reset to overview"
        >
          <RotateCcw size={18} className="shrink-0" />
          {!collapsed && <span>Reset View</span>}
        </button>
        <button
          type="button"
          onClick={toggleLabels}
          className="nav-item w-full"
          title={labelsVisible ? 'Hide room labels' : 'Show room labels'}
        >
          {labelsVisible ? (
            <Eye size={18} className="shrink-0" />
          ) : (
            <EyeOff size={18} className="shrink-0" />
          )}
          {!collapsed && <span>{labelsVisible ? 'Hide Labels' : 'Show Labels'}</span>}
        </button>
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="nav-item w-full"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <ChevronRight size={18} className="shrink-0" />
          ) : (
            <ChevronLeft size={18} className="shrink-0" />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 248 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-0 z-40 hidden h-full border-r border-[#26343D] bg-sidebar/95 backdrop-blur-md md:block ${width}`}
        style={{ width: collapsed ? 76 : 248 }}
      >
        {content}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 z-50 h-full w-[260px] border-r border-[#26343D] bg-sidebar md:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
