import { X, Download, ExternalLink, AlertCircle } from 'lucide-react'
import { profile } from '../data/profile'

/**
 * CV preview modal. Embeds the real PDF via an <object>/<iframe> and provides
 * Download and open-in-new-tab actions. Shows a clear error state if the file
 * is missing.
 */
export default function CVViewer({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="CV preview"
    >
      <div
        className="glass-panel flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#26343D] px-4 py-3">
          <div>
            <h3 className="font-display text-sm font-bold text-text-primary">
              {profile.fullName} — CV
            </h3>
            <p className="text-[11px] text-text-secondary">
              {profile.education.degree}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a href={profile.cvPath} download className="btn-ghost text-xs !px-3 !py-1.5">
              <Download size={13} /> Download
            </a>
            <a
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs !px-3 !py-1.5"
            >
              <ExternalLink size={13} /> Open
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1.5 text-text-secondary transition-colors hover:bg-white/5 hover:text-gold"
              aria-label="Close CV preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF body */}
        <div className="relative flex-1 bg-[#0B1115]">
          <object
            data={profile.cvPath}
            type="application/pdf"
            className="h-[70vh] w-full"
            aria-label="CV PDF preview"
          >
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <AlertCircle size={28} className="text-gold" />
              <p className="text-sm text-text-secondary">
                Your browser can't display the PDF inline.
              </p>
              <a href={profile.cvPath} download className="btn-primary text-xs">
                <Download size={14} /> Download the CV instead
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  )
}
