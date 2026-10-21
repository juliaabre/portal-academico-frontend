import { initialPortalData } from '@/mocks/seed'
import type { PortalData, PortalDataAction } from '@/types'

type CommunicationAction = Extract<PortalDataAction, { type: 'announcement' | 'read-announcement' }>
type CommunicationData = Pick<PortalData, 'announcements'>

export function getCommunicationData(): CommunicationData {
  return { announcements: structuredClone(initialPortalData.announcements) }
}

export function updateCommunicationData(data: PortalData, action: CommunicationAction): PortalData {
  if (action.type === 'announcement') {
    return { ...data, announcements: [action.value, ...data.announcements] }
  }
  return { ...data, announcements: data.announcements.map((item) => item.id === action.id ? { ...item, read: true } : item) }
}
