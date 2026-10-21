import { initialPortalData } from '@/mocks/seed'
import type { PortalData } from '@/types'

type AcademicData = Pick<PortalData, 'courses' | 'schedule'>

export function getAcademicData(): AcademicData {
  const { courses, schedule } = structuredClone(initialPortalData)
  return { courses, schedule }
}
