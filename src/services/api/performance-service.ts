import { initialPortalData } from '@/mocks/seed'
import type { PortalData } from '@/types'

type PerformanceData = Pick<PortalData, 'grades' | 'studentResults'>

export function getPerformanceData(): PerformanceData {
  const { grades, studentResults } = structuredClone(initialPortalData)
  return { grades, studentResults }
}
