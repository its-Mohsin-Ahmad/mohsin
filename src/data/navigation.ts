import type { RoomId } from '../types'
import { rooms } from './rooms'

/**
 * Sidebar navigation order (matches the visual top-to-bottom order the visitor
 * expects). Home maps to the overview + Reception.
 */
export interface NavEntry {
  id: RoomId | 'home'
  label: string
  icon: string
}

export const navigation: NavEntry[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'development', label: 'Development Studio', icon: 'code' },
  { id: 'analytics', label: 'Analytics Lab', icon: 'chart' },
  { id: 'showroom', label: 'Project Showroom', icon: 'gallery' },
  { id: 'meeting', label: 'Meeting Room', icon: 'users' },
  { id: 'education', label: 'Education Corner', icon: 'book' },
  { id: 'contact', label: 'Contact Lounge', icon: 'mail' },
  { id: 'owners', label: "Owner's Cabin", icon: 'user' },
]

/** Guided tour step copy shown at each stop. */
export const tourCopy: Record<RoomId, string> = {
  reception:
    'Welcome to my digital office. This is the reception — the starting point of the tour.',
  development:
    'The Development Studio, where I build responsive interfaces with HTML, CSS, JavaScript, and React.',
  analytics:
    'The Analytics Lab — my space for Microsoft Excel and Power BI dashboards and data visualization.',
  showroom:
    'The Project Showroom, featuring five real projects I have designed, built, and deployed.',
  meeting:
    'The Meeting Room, where we can discuss frontend development, dashboards, and new ideas.',
  education:
    'The Education Corner — my BS in Software Engineering at Islamia College Peshawar, 2025 to 2029.',
  contact:
    'The Contact Lounge — reach me by email, phone, or social links. I would love to hear from you.',
  owners:
    "The Owner's Cabin — the heart of the portfolio, with my full profile, skills, and CV.",
}

export { rooms }
