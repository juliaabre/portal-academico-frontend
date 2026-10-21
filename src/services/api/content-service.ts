import { initialPortalData } from '@/mocks/seed'
import type { PortalData, PortalDataAction } from '@/types'

type ContentAction = Extract<PortalDataAction, { type: 'activity' | 'complete-activity' | 'material' }>
type ContentData = Pick<PortalData, 'activities' | 'materials'>

export function getContentData(): ContentData {
  const { activities, materials } = structuredClone(initialPortalData)
  return { activities, materials }
}

export function updateContentData(data: PortalData, action: ContentAction): PortalData {
  if (action.type === 'activity') {
    return { ...data, activities: [action.value, ...data.activities] }
  }
  if (action.type === 'material') {
    return { ...data, materials: [action.value, ...data.materials] }
  }
  return { ...data, activities: data.activities.map((activity) => activity.id === action.id ? { ...activity, completed: true } : activity) }
}
