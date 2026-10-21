import { getAcademicData } from '@/services/api/academic-service'
import { getCommunicationData, updateCommunicationData } from '@/services/api/communication-service'
import { getContentData, updateContentData } from '@/services/api/content-service'
import { getPerformanceData } from '@/services/api/performance-service'
import { getStudentData, updateStudentData } from '@/services/api/student-service'
import type { PortalData, PortalDataAction } from '@/types'

export function loadPortalData(): PortalData {
  return {
    ...getAcademicData(),
    ...getPerformanceData(),
    ...getCommunicationData(),
    ...getContentData(),
    ...getStudentData(),
  }
}

export function updatePortalData(data: PortalData, action: PortalDataAction): PortalData {
  switch (action.type) {
    case 'announcement':
    case 'read-announcement':
      return updateCommunicationData(data, action)
    case 'activity':
    case 'complete-activity':
    case 'material':
      return updateContentData(data, action)
    case 'request':
      return updateStudentData(data, action)
  }
}
