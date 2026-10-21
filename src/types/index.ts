export type UserRole = 'aluno' | 'professor'

export interface PortalUser {
  id: string
  name: string
  email: string
  role: UserRole
  course: string
  registration: string
}

export interface Course {
  id: string
  name: string
  code: string
  instructor: string
  room: string
  workload: number
  color: string
}

export interface ClassMeeting {
  id: string
  courseId: string
  day: string
  start: string
  end: string
  room: string
}

export interface GradeRecord {
  id: string
  courseId: string
  assessment: string
  score: number
  date: string
}

export interface StudentResult {
  id: string
  name: string
  registration: string
  courseId: string
  average: number
  attendance: number
}

export interface Material {
  id: string
  courseId: string
  title: string
  description: string
  publishedAt: string
  kind: string
}

export interface Activity {
  id: string
  courseId: string
  title: string
  description: string
  dueDate: string
  completed: boolean
}

export interface Announcement {
  id: string
  title: string
  content: string
  kind: 'notification' | 'announcement'
  courseId: string | null
  publishedAt: string
  author: string
  read: boolean
}

export interface AcademicRequest {
  id: string
  type: string
  subject: string
  description: string
  date: string
  status: 'Em análise' | 'Atendida' | 'Indeferida'
}

export interface PortalData {
  courses: Course[]
  schedule: ClassMeeting[]
  grades: GradeRecord[]
  studentResults: StudentResult[]
  materials: Material[]
  activities: Activity[]
  announcements: Announcement[]
  requests: AcademicRequest[]
}

export type PortalDataAction =
  | { type: 'request'; value: AcademicRequest }
  | { type: 'activity'; value: Activity }
  | { type: 'announcement'; value: Announcement }
  | { type: 'complete-activity'; id: string }
  | { type: 'read-announcement'; id: string }
  | { type: 'material'; value: Material }

export interface NavItem {
  label: string
  path: string
  icon: import('lucide-react').LucideIcon
}
