export type RoomId =
  | 'reception'
  | 'development'
  | 'analytics'
  | 'showroom'
  | 'meeting'
  | 'education'
  | 'contact'
  | 'owners'

export interface RoomPosition {
  x: number
  z: number
}

export interface RoomMeta {
  id: RoomId
  name: string
  /** Short label used in the sidebar (may equal name). */
  shortName: string
  icon: string
  /** Center of the room in world space (X/Z), used for labels + camera. */
  position: RoomPosition
  /** Camera target offset above the room center. */
  cameraTarget: [number, number, number]
  /** Camera position (spherical-ish) when this room is focused. */
  cameraPosition: [number, number, number]
  /** Accent colour used for highlight. */
  accent: string
  /** One-line summary shown under the room heading. */
  tagline: string
}

export interface ProfileInfo {
  fullName: string
  monogram: string
  headline: string
  roles: string[]
  about: string
  education: {
    degree: string
    institution: string
    period: string
    gpa: string
    location: string
  }
  location: string
  email: string
  phone: string
  socials: {
    github: string
    linkedin: string
    facebook: string
  }
  cvPath: string
}

export interface ProjectLink {
  live: string
  repo?: string
  demo?: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  technologies: string[]
  links: ProjectLink
  /** Whether we could capture/verify a live preview. If false, show neutral placeholder. */
  previewVerified: boolean
  /** Optional colour used for the neutral preview placeholder. */
  accent: string
  featured?: boolean
}

export interface SkillItem {
  name: string
  /** Short factual description of the tool's role. */
  detail: string
  /** Category grouping. */
  category: 'frontend' | 'analytics'
}

export interface TimelineEntry {
  period: string
  title: string
  org: string
  detail: string
}
