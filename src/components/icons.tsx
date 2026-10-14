import {
  Home,
  Code2,
  BarChart3,
  Images,
  Users,
  BookOpen,
  Mail,
  User,
  DoorOpen,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  home: Home,
  code: Code2,
  chart: BarChart3,
  gallery: Images,
  users: Users,
  book: BookOpen,
  mail: Mail,
  user: User,
  door: DoorOpen,
}

export function getIcon(name: string): LucideIcon {
  return map[name] ?? Home
}
