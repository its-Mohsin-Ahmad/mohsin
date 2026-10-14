import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { profile } from '../data/profile'

/**
 * Contact form. When no backend endpoint is configured (no VITE_CONTACT_ENDPOINT
 * env var), it validates input and then honestly reports that no mail service is
 * configured, offering direct email as the working alternative. No secrets are
 * exposed and no message is pretended to be sent.
 */

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

interface Fields {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = (): boolean => {
    const e: Partial<Fields> = {}
    if (!fields.name.trim()) e.name = 'Please enter your name.'
    if (!fields.email.trim()) e.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(fields.email)) e.email = 'Please enter a valid email address.'
    if (!fields.subject.trim()) e.subject = 'Please enter a subject.'
    if (!fields.message.trim()) e.message = 'Please enter a message.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    // No configured backend: be honest, don't pretend to send.
    if (!ENDPOINT) {
      setStatus('unconfigured')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: ev.target.value }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field id="cf-name" label="Full Name" error={errors.name}>
          <input id="cf-name" className={`field-input ${errors.name ? 'error' : ''}`} value={fields.name} onChange={set('name')} placeholder="Your name" />
        </Field>
        <Field id="cf-email" label="Email Address" error={errors.email}>
          <input id="cf-email" type="email" className={`field-input ${errors.email ? 'error' : ''}`} value={fields.email} onChange={set('email')} placeholder="you@example.com" />
        </Field>
      </div>
      <Field id="cf-subject" label="Subject" error={errors.subject}>
        <input id="cf-subject" className={`field-input ${errors.subject ? 'error' : ''}`} value={fields.subject} onChange={set('subject')} placeholder="What's this about?" />
      </Field>
      <Field id="cf-message" label="Message" error={errors.message}>
        <textarea id="cf-message" rows={4} className={`field-input resize-none ${errors.message ? 'error' : ''}`} value={fields.message} onChange={set('message')} placeholder="Your message..." />
      </Field>

      <button type="submit" className="btn-primary w-full text-xs" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B1115]/30 border-t-[#0B1115]" /> Sending...
          </>
        ) : (
          <>
            <Send size={14} /> Send Message
          </>
        )}
      </button>

      {status === 'success' && (
        <Notice tone="success" icon={<CheckCircle2 size={14} />}>
          Thank you — your message was sent successfully.
        </Notice>
      )}
      {status === 'error' && (
        <Notice tone="error" icon={<AlertCircle size={14} />}>
          Something went wrong sending your message. Please try again or email me directly.
        </Notice>
      )}
      {status === 'unconfigured' && (
        <Notice tone="info" icon={<Info size={14} />}>
          The mail service isn't configured yet. For now, please reach me directly at{' '}
          <a href={`mailto:${profile.email}`} className="text-gold underline">{profile.email}</a>. (See
          README to connect a form backend.)
        </Notice>
      )}
    </form>
  )
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-400">{error}</p>}
    </div>
  )
}

function Notice({
  tone,
  icon,
  children,
}: {
  tone: 'success' | 'error' | 'info'
  icon: React.ReactNode
  children: React.ReactNode
}) {
  const tones = {
    success: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
    error: 'border-red-400/40 bg-red-400/10 text-red-300',
    info: 'border-gold/40 bg-gold/10 text-gold',
  }
  return (
    <div className={`flex items-start gap-2 rounded-lg border p-3 text-xs leading-relaxed ${tones[tone]}`}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span>{children}</span>
    </div>
  )
}
