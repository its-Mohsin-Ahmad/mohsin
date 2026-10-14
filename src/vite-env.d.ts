/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional contact-form backend endpoint (e.g. Formspree URL). */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

