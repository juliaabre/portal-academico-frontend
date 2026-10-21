import { useMemo, useState } from 'react'
import { BookOpen, CalendarDays, Clock3, MapPin } from 'lucide-react'
import { PageHeader, Panel, StatusPill } from '@/components/shared/ui'
import { usePortal } from '@/context/PortalContext'
import type { Course } from '@/types'

const weekdays = ['Todos os dias', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira']

export default function AcademicPage() {
  const { user, data } = usePortal()
  const [selectedDay, setSelectedDay] = useState('Todos os dias')
  const isTeacher = user?.role === 'professor'
  const teacherCourses = data.courses.filter((course) => ['c1', 'c3'].includes(course.id))
  const courses = isTeacher ? teacherCourses : data.courses
  const meetings = useMemo(() => data.schedule.filter((item) => (selectedDay === 'Todos os dias' || item.day === selectedDay) && courses.some((course) => course.id === item.courseId)), [data.schedule, selectedDay, courses])

  return (
    <div className="page-stack">
      <PageHeader eyebrow="VIDA ACADÊMICA" title={isTeacher ? 'Turmas e horários' : 'Disciplinas e horários'} description={isTeacher ? 'Consulte as turmas e os horários das suas aulas neste período.' : 'Suas disciplinas, professores e encontros semanais em um só lugar.'} />
      <div className="stats-grid compact-stats"><div className="mini-stat"><span><BookOpen /></span><div><strong>{courses.length}</strong><small>{isTeacher ? 'Turmas ativas' : 'Disciplinas'}</small></div></div><div className="mini-stat"><span className="mini-stat-green"><Clock3 /></span><div><strong>{courses.reduce((sum, course) => sum + course.workload, 0)}h</strong><small>Carga horária total</small></div></div><div className="mini-stat"><span className="mini-stat-violet"><CalendarDays /></span><div><strong>{meetings.length}</strong><small>Encontros na semana</small></div></div></div>
      <Panel title={isTeacher ? 'Suas turmas' : 'Disciplinas matriculadas'} description="Período letivo 2026.2">
        <div className="course-grid">{courses.map((course) => <CourseCard key={course.id} course={course} isTeacher={isTeacher} />)}</div>
      </Panel>
      <Panel title="Grade semanal" description="Horários, dias e salas dos encontros" action={<label className="select-label"><span className="sr-only">Filtrar por dia</span><select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>{weekdays.map((day) => <option key={day}>{day}</option>)}</select></label>}>
        {meetings.length ? <div className="meeting-list">{meetings.map((meeting) => { const course = data.courses.find((item) => item.id === meeting.courseId); return <div className="meeting-row" key={meeting.id}><div className="meeting-day"><span>{meeting.day.slice(0, 3)}</span><strong>{meeting.start}</strong></div><span className={`meeting-line tone-${course?.color ?? 'blue'}`} /><div className="meeting-info"><strong>{course?.name}</strong><span>{course?.code} · {meeting.end}</span></div><span className="meeting-room"><MapPin />{meeting.room}</span></div> })}</div> : <div className="empty-state"><span className="empty-mark">—</span><strong>Nenhuma aula neste dia</strong><p>Selecione outro dia para consultar seus horários.</p></div>}
      </Panel>
    </div>
  )
}

function CourseCard({ course, isTeacher }: { course: Course; isTeacher: boolean }) {
  return <article className="course-card"><div className="course-card-top"><span className={`course-icon tone-${course.color}`}><BookOpen /></span><StatusPill tone="info">{course.code}</StatusPill></div><h3>{course.name}</h3><p>{isTeacher ? 'Turma sob sua responsabilidade' : course.instructor}</p><div className="course-card-meta"><span><Clock3 />{course.workload}h no semestre</span><span><MapPin />{course.room}</span></div></article>
}
