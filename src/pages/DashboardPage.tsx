import { ArrowRight, ArrowUpRight, Bell, BookOpen, CalendarDays, CheckCircle2, Clock3, FileText, MapPin, Megaphone, Sparkles, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader, Panel, StatCard, StatusPill } from '@/components/shared/ui'
import { usePortal } from '@/context/PortalContext'
import { formatDate } from '@/utils/format'

export default function DashboardPage() {
  const { user, data } = usePortal()
  const isTeacher = user?.role === 'professor'
  const teacherCourseIds = ['c1', 'c3']
  const pending = data.activities.filter((activity) => !activity.completed && (!isTeacher || teacherCourseIds.includes(activity.courseId)))
  const unread = data.announcements.filter((item) => !item.read)
  const average = (data.grades.reduce((sum, item) => sum + item.score, 0) / data.grades.length).toFixed(1)
  const nextClasses = data.schedule.filter((meeting) => !isTeacher || teacherCourseIds.includes(meeting.courseId)).slice(0, 3)

  return (
    <div className="page-stack">
      <PageHeader eyebrow="VISÃO GERAL · PERÍODO 2026.2" title={`Olá, ${user?.name.split(' ')[0]}!`} description={isTeacher ? 'Aqui está o resumo das suas turmas e atividades.' : 'Veja o que está acontecendo na sua vida acadêmica.'} />
      <section className="welcome-banner">
        <div className="welcome-copy"><span className="welcome-tag"><Sparkles /> {isTeacher ? 'ESPAÇO DO PROFESSOR' : 'SEU SEMESTRE EM MOVIMENTO'}</span><h2>{isTeacher ? 'Acompanhe cada turma de perto.' : 'Cada etapa aproxima você dos seus objetivos.'}</h2><p>{isTeacher ? 'Materiais, turmas e comunicados organizados para o seu dia.' : 'Seu percurso acadêmico, organizado para você seguir no seu ritmo.'}</p><Link className="welcome-link" to={isTeacher ? '/desempenho' : '/disciplinas'}>{isTeacher ? 'Acompanhar turmas' : 'Ver minha grade'} <ArrowRight /></Link></div>
        <div className="welcome-side"><span className="welcome-side-label">PRÓXIMO MARCO</span><strong>{isTeacher ? 'Revisão de atividades' : 'Entrega de atividades'}</strong><span>{pending.length} {pending.length === 1 ? 'atividade pendente' : 'atividades pendentes'}</span><div className="welcome-progress"><span style={{ width: `${Math.max(26, 100 - pending.length * 18)}%` }} /></div><small>{isTeacher ? 'Acompanhe o progresso das suas turmas' : 'Você está avançando muito bem'}</small></div>
        <div className="welcome-decoration" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <div className="stats-grid">
        <StatCard label={isTeacher ? 'Turmas ativas' : 'Disciplinas'} value={isTeacher ? '2' : data.courses.length} note={isTeacher ? 'Neste período letivo' : 'Matriculadas no período'} icon={BookOpen} tone="blue" />
        <StatCard label={isTeacher ? 'Média das turmas' : 'Média geral'} value={isTeacher ? '8,4' : `${average.replace('.', ',')}`} note={isTeacher ? 'Considerando suas turmas' : 'Nas avaliações lançadas'} icon={TrendingUp} tone="green" />
        <StatCard label={isTeacher ? 'Acompanhar' : 'Atividades pendentes'} value={pending.length} note={isTeacher ? 'Entregas aguardando revisão' : 'Com prazo nos próximos dias'} icon={CalendarDays} tone="amber" />
        <StatCard label="Não lidas" value={unread.length} note="Comunicados recentes" icon={Bell} tone="violet" />
      </div>

      <div className="dashboard-grid">
        <Panel title={isTeacher ? 'Próximas aulas' : 'Sua semana'} description={isTeacher ? 'Horários das turmas sob sua responsabilidade' : 'Confira seus próximos encontros'} action={<Link className="panel-link" to="/disciplinas">Ver grade <ArrowUpRight /></Link>}>
          <div className="schedule-list">
            {nextClasses.map((meeting) => {
              const course = data.courses.find((item) => item.id === meeting.courseId)
              return <div className="schedule-row" key={meeting.id}><div className={`course-initial tone-${course?.color ?? 'blue'}`}>{course?.code.slice(0, 2)}</div><div className="schedule-main"><strong>{course?.name}</strong><span>{meeting.day} · {meeting.room}</span></div><div className="schedule-time"><Clock3 />{meeting.start}</div></div>
            })}
          </div>
        </Panel>
        <Panel title={isTeacher ? 'Acompanhar entregas' : 'Atividades próximas'} description={isTeacher ? 'Entregas para revisar nas suas turmas' : 'Organize seus próximos prazos'} action={<Link className="panel-link" to="/materiais">Ver atividades <ArrowUpRight /></Link>}>
          <div className="task-list">{pending.slice(0, 3).map((activity) => { const course = data.courses.find((item) => item.id === activity.courseId); return <div className="task-row" key={activity.id}><span className="task-check"><CheckCircle2 /></span><div className="task-copy"><strong>{activity.title}</strong><span>{course?.name}</span></div><span className="task-date">{formatDate(activity.dueDate)}</span></div> })}</div>
          {pending.length === 0 && <div className="small-success">Tudo em dia por aqui.</div>}
        </Panel>
        <Panel title="Comunicados recentes" description="Informações para acompanhar" action={<Link className="panel-link" to="/comunicados">Ver mural <ArrowUpRight /></Link>} className="dashboard-wide">
          <div className="announcement-list">{data.announcements.slice(0, 2).map((item) => <article className={`announcement-row ${!item.read ? 'announcement-unread' : ''}`} key={item.id}><span className="announcement-icon"><Megaphone /></span><div><div className="announcement-meta"><strong>{item.title}</strong>{!item.read && <StatusPill tone="info">Novo</StatusPill>}</div><p>{item.content}</p><small>{item.author} · {formatDate(item.publishedAt)}</small></div></article>)}</div>
        </Panel>
        <Panel title={isTeacher ? 'Visão das turmas' : 'Resumo acadêmico'} description={isTeacher ? 'Um panorama rápido das suas aulas' : 'Seu progresso neste semestre'} className="dashboard-wide">
          <div className="summary-strip"><div><span className="summary-icon"><BookOpen /></span><div><small>{isTeacher ? 'Turmas' : 'Disciplinas ativas'}</small><strong>{isTeacher ? 'Design de Interfaces · Experiência do Usuário' : `${data.courses.length} disciplinas em andamento`}</strong></div></div><div><span className="summary-icon summary-icon-alt"><MapPin /></span><div><small>{isTeacher ? 'Próxima atividade' : 'Próximo prazo'}</small><strong>{pending[0]?.title ?? 'Nenhum prazo próximo'}</strong></div><Link to="/materiais" aria-label="Abrir atividades"><ArrowRight /></Link></div></div>
        </Panel>
      </div>
      <div className="dashboard-footer-note"><FileText /> Informações de demonstração atualizadas para o período 2026.2.</div>
    </div>
  )
}
