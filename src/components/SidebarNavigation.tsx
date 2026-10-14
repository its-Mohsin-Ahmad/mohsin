import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  EyeOff,
  MousePointer2,
  Hand,
  Move,
} from 'lucide-react'
import Monogram from './Monogram'
import { getIcon } from './icons'
import { navigation } from '../data/navigation'
import { useOffice } from '../office/OfficeContext'

/** A small keycap used in the Camera & Movement control panel. */
function Key({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-6 min-w-[22px] items-center justify-center rounded-md border border-[#2c3a44] bg-[#0d151b] px-1.5 text-[10px] font-semibold text-text-primary shadow-[inset_0_-1px_0_rgba(0,0,0,0.4)]">
      {children}
    </span>
  )
}

/** Zoom/magnifier glyph matching the reference control legend. */
function ZoomGlyph() {
  return (
    <span className="text-gold">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    </span>
  )
}

/**
 * Persistent dark left sidebar: MA logo, wordmark, collapse toggle (top), the
 * eight room navigation entries, and a "Camera & Movement" control panel at the
 * bottom. On mobile it becomes a slide-in drawer.
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
      {/* Brand + collapse toggle */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-4">
        <Monogram size={collapsed ? 40 : 44} />
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div className="truncate font-display text-sm font-bold tracking-wide text-text-primary">
              MOHSIN AHMAD
            </div>
            <div className="text-[10px] tracking-[0.25em] text-text-secondary">
              DIGITAL PORTFOLIO
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#26343D] bg-[#0d151b] text-text-secondary transition-colors hover:border-gold/60 hover:text-gold"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
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

      {/* Footer: camera & movement controls + reset */}
      <div className="space-y-2 border-t border-[#26343D] px-3 py-3">
        {!collapsed && (
          <div className="rounded-xl border border-[#26343D] bg-[#0d151b]/70 p-3">
            <div className="section-label mb-2.5 text-[10px]">
              Camera &amp; Movement
            </div>

            <div className="flex items-center gap-2.5">
              <div className="grid grid-cols-3 grid-rows-2 gap-1">
                <span />
                <Key>W</Key>
                <span />
                <Key>A</Key>
                <Key>S</Key>
                <Key>D</Key>
              </div>
              <div className="space-y-1 text-[11px] text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <Move size={13} className="text-gold" /> Move
                </div>
                <div className="flex items-center gap-1.5">
                  <Hand size={13} className="text-gold" /> Look Around
                </div>
              </div>
            </div>

            <div className="mt-2.5 space-y-1.5 text-[11px] text-text-secondary">
              <div className="flex items-center gap-1.5">
                <ZoomGlyph /> Zoom (scroll)
              </div>
              <div className="flex items-center gap-1.5">
                <Key>Esc</Key> Close Panel
              </div>
              <div className="flex items-center gap-1.5">
                <MousePointer2 size={13} className="text-gold" /> Click a room to
                visit
              </div>
            </div>
          </div>
        )}

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
