import { initialPortalData } from '@/mocks/seed'
import type { AcademicRequest, PortalData, PortalDataAction } from '@/types'

type StudentAction = Extract<PortalDataAction, { type: 'request' }>
type StudentData = Pick<PortalData, 'requests'>

export function getStudentData(): StudentData {
  return { requests: structuredClone(initialPortalData.requests) }
}

export function createRequest(input: Omit<AcademicRequest, 'id' | 'date' | 'status'>): AcademicRequest {
  return { ...input, id: `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`, date: new Date().toISOString().slice(0, 10), status: 'Em análise' }
}

export function updateStudentData(data: PortalData, action: StudentAction): PortalData {
  return { ...data, requests: [action.value, ...data.requests] }
}
