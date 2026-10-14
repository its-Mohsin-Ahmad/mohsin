import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'
import type { RoomId } from '../types'
import { OVERVIEW_CAMERA, roomById } from '../data/rooms'

export type ActiveRoom = RoomId | 'home'

interface CameraGoal {
  position: [number, number, number]
  target: [number, number, number]
}

interface OfficeState {
  /** 'home' = overview, otherwise the focused room. */
  active: ActiveRoom
  isOverview: boolean
  /** Increments on each navigation so the 3D layer can react. */
  navCount: number
  navigateTo: (room: ActiveRoom) => void
  goOverview: () => void

  /** Where the character should walk to (world coords), if any. */
  characterGoal: [number, number] | null
  sendCharacterTo: (x: number, z: number) => void
  clearCharacterGoal: () => void

  /** Camera goal the 3D layer reads. */
  cameraGoal: CameraGoal

  /** UI visibility toggles. */
  labelsVisible: boolean
  toggleLabels: () => void

  /** Profile panel state. */
  profileMinimized: boolean
  setProfileMinimized: (v: boolean) => void
  profileClosed: boolean
  setProfileClosed: (v: boolean) => void

  /** Info panel (room content) open state is derived from active !== home. */
}

const OfficeContext = createContext<OfficeState | null>(null)

export function OfficeProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveRoom>('home')
  const [navCount, setNavCount] = useState(0)
  const [characterGoal, setCharacterGoal] = useState<
    [number, number] | null
  >(null)
  const [labelsVisible, setLabelsVisible] = useState(true)
  const [profileMinimized, setProfileMinimized] = useState(false)
  const [profileClosed, setProfileClosed] = useState(false)

  const navigateTo = useCallback((room: ActiveRoom) => {
    setActive(room)
    setNavCount((n) => n + 1)
  }, [])

  const goOverview = useCallback(() => {
    setActive('home')
    setNavCount((n) => n + 1)
  }, [])

  const sendCharacterTo = useCallback((x: number, z: number) => {
    setCharacterGoal([x, z])
  }, [])

  const clearCharacterGoal = useCallback(() => setCharacterGoal(null), [])

  const toggleLabels = useCallback(
    () => setLabelsVisible((v) => !v),
    [],
  )

  const cameraGoal = useMemo<CameraGoal>(() => {
    if (active === 'home') {
      return {
        position: OVERVIEW_CAMERA.position,
        target: OVERVIEW_CAMERA.target,
      }
    }
    const room = roomById(active as RoomId)
    return { position: room.cameraPosition, target: room.cameraTarget }
  }, [active])

  const value = useMemo<OfficeState>(
    () => ({
      active,
      isOverview: active === 'home',
      navCount,
      navigateTo,
      goOverview,
      characterGoal,
      sendCharacterTo,
      clearCharacterGoal,
      cameraGoal,
      labelsVisible,
      toggleLabels,
      profileMinimized,
      setProfileMinimized,
      profileClosed,
      setProfileClosed,
    }),
    [
      active,
      navCount,
      navigateTo,
      goOverview,
      characterGoal,
      sendCharacterTo,
      clearCharacterGoal,
      cameraGoal,
      labelsVisible,
      toggleLabels,
      profileMinimized,
      profileClosed,
    ],
  )

  return (
    <OfficeContext.Provider value={value}>{children}</OfficeContext.Provider>
  )
}

export function useOffice(): OfficeState {
  const ctx = useContext(OfficeContext)
  if (!ctx) throw new Error('useOffice must be used within OfficeProvider')
  return ctx
}
