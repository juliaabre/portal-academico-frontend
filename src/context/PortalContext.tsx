import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode } from 'react'
import { loadPortalData, updatePortalData } from '@/services/api/mock-api'
import type { PortalData, PortalDataAction, PortalUser } from '@/types'

interface PortalContextValue {
  user: PortalUser | null
  signIn: (user: PortalUser) => void
  signOut: () => void
  data: PortalData
  dispatchData: Dispatch<PortalDataAction>
}

const PortalContext = createContext<PortalContextValue | null>(null)

export function PortalProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(null)
  const [data, setData] = useState<PortalData>(loadPortalData)
  const value = useMemo<PortalContextValue>(() => ({
    user,
    signIn: (nextUser) => setUser(nextUser),
    signOut: () => setUser(null),
    data,
    dispatchData: (action) => setData((current) => updatePortalData(current, action)),
  }), [user, data])

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

export function usePortal() {
  const context = useContext(PortalContext)
  if (!context) throw new Error('usePortal deve ser usado dentro de PortalProvider.')
  return context
}

