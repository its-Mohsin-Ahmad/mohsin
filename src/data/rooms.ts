import type { RoomMeta, RoomId } from '../types'

/**
 * The office is a 3x3 architectural grid. The centre cell is a shared atrium /
 * circulation area, and the eight surrounding cells are the rooms. This keeps
 * every room physically connected to one building (no floating islands).
 *
 * World units are metres. Cell spacing is 15 units.
 */
export const ROOM_CELL = 15

export const rooms: RoomMeta[] = [
  {
    id: 'reception',
    name: 'Reception',
    shortName: 'Home',
    icon: 'door',
    position: { x: -15, z: 15 },
    cameraTarget: [-15, 2, 15],
    cameraPosition: [-15, 20, 38],
    accent: '#D9AE63',
    tagline: 'Step into my workspace and begin the tour.',
  },
  {
    id: 'development',
    name: 'Development Studio',
    shortName: 'Dev Studio',
    icon: 'code',
    position: { x: -15, z: -15 },
    cameraTarget: [-15, 2, -15],
    cameraPosition: [-15, 20, 8],
    accent: '#6FB3D9',
    tagline: 'Where ideas become responsive interfaces.',
  },
  {
    id: 'analytics',
    name: 'Analytics Lab',
    shortName: 'Analytics Lab',
    icon: 'chart',
    position: { x: 15, z: -15 },
    cameraTarget: [15, 2, -15],
    cameraPosition: [15, 20, 8],
    accent: '#7FC8A9',
    tagline: 'Turning data into clear visual insight.',
  },
  {
    id: 'showroom',
    name: 'Project Showroom',
    shortName: 'Showroom',
    icon: 'gallery',
    position: { x: 15, z: 15 },
    cameraTarget: [15, 2, 15],
    cameraPosition: [15, 20, 38],
    accent: '#E0A458',
    tagline: 'Five real projects, built and deployed.',
  },
  {
    id: 'meeting',
    name: 'Meeting Room',
    shortName: 'Meeting',
    icon: 'users',
    position: { x: 0, z: -15 },
    cameraTarget: [0, 2, -15],
    cameraPosition: [0, 20, 8],
    accent: '#9FB4D9',
    tagline: "Let's build something great together.",
  },
  {
    id: 'education',
    name: 'Education Corner',
    shortName: 'Education',
    icon: 'book',
    position: { x: 0, z: 15 },
    cameraTarget: [0, 2, 15],
    cameraPosition: [0, 20, 38],
    accent: '#C9B37E',
    tagline: 'BS Software Engineering, 2025–2029.',
  },
  {
    id: 'contact',
    name: 'Contact Lounge',
    shortName: 'Contact',
    icon: 'mail',
    position: { x: -15, z: 0 },
    cameraTarget: [-15, 2, 0],
    cameraPosition: [8, 20, 8],
    accent: '#D9AE63',
    tagline: "Let's connect — I'd love to hear from you.",
  },
  {
    id: 'owners',
    name: "Owner's Cabin",
    shortName: "Owner's Cabin",
    icon: 'user',
    position: { x: 15, z: 0 },
    cameraTarget: [15, 2, 0],
    cameraPosition: [38, 20, 8],
    accent: '#D9AE63',
    tagline: 'The person behind the projects.',
  },
]

/** Centre of the building (the shared atrium / circulation area). */
export const ATRIUM_CENTER = { x: 0, z: 0 }

/** Default elevated three-quarter isometric overview camera. */
export const OVERVIEW_CAMERA = {
  position: [40, 44, 46] as [number, number, number],
  target: [0, 0, 0] as [number, number, number],
}

export const roomById = (id: RoomId): RoomMeta => {
  const room = rooms.find((r) => r.id === id)
  if (!room) throw new Error(`Unknown room id: ${id}`)
  return room
}

/** Order used by the guided tour. */
export const tourOrder: RoomId[] = [
  'reception',
  'development',
  'analytics',
  'showroom',
  'meeting',
  'education',
  'contact',
  'owners',
]
