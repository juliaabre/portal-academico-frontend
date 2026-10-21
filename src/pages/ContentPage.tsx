import { useState, type FormEvent } from 'react'
import { BookOpen, CalendarDays, Check, Circle, Download, FilePlus2, FileText, Plus, Send } from 'lucide-react'
import { PageHeader, Panel, StatusPill, FormMessage } from '@/components/shared/ui'
import { usePortal } from '@/context/PortalContext'
import { formatDate } from '@/utils/format'

export default function ContentPage() {
  const { user, data, dispatchData } = usePortal()
  const isTeacher = user?.role === 'professor'
  const [mode, setMode] = useState<'material' | 'activity'>('material')
  const [feedback, setFeedback] = useState('')
  const courseFor = (id: string) => data.courses.find((course) => course.id === id)
  const materials = isTeacher ? data.materials.filter((item) => ['c1', 'c3'].includes(item.courseId)) : data.materials
  const activities = isTeacher ? data.activities.filter((item) => ['c1', 'c3'].includes(item.courseId)) : data.activities
  const teacherCourses = data.courses.filter((course) => ['c1', 'c3'].includes(course.id))

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const courseId = String(form.get('courseId'))
    const title = String(form.get('title')).trim()
    const description = String(form.get('description')).trim()
    if (!title || !description) return
    if (mode === 'material') {
      dispatchData({ type: 'material', value: { id: `m-${Date.now()}`, courseId, title, description, publishedAt: new Date().toISOString().slice(0, 10), kind: String(form.get('kind')) } })
    } else {
      dispatchData({ type: 'activity', value: { id: `a-${Date.now()}`, courseId, title, description, dueDate: String(form.get('dueDate')), completed: false } })
    }
    event.currentTarget.reset()
    setFeedback(mode === 'material' ? 'Material publicado com sucesso.' : 'Atividade criada com sucesso.')
  }

  return (
    <div className="page-stack">
      <PageHeader eyebrow="CONTEÚDO ACADÊMICO" title={isTeacher ? 'Conteúdos das turmas' : 'Materiais e atividades'} description={isTeacher ? 'Compartilhe materiais de apoio e acompanhe as atividades das suas turmas.' : 'Acesse os materiais das disciplinas e acompanhe os próximos prazos.'} />
      {isTeacher && <Panel title="Adicionar conteúdo" description="Crie um novo material ou atividade para uma das suas turmas" className="form-panel">
        <div className="form-tabs" role="tablist" aria-label="Tipo de conteúdo"><button role="tab" aria-selected={mode === 'material'} className={mode === 'material' ? 'form-tab-active' : ''} onClick={() => { setMode('material'); setFeedback('') }}><FilePlus2 />Material</button><button role="tab" aria-selected={mode === 'activity'} className={mode === 'activity' ? 'form-tab-active' : ''} onClick={() => { setMode('activity'); setFeedback('') }}><CalendarDays />Atividade</button></div>
        <form className="content-form" onSubmit={submit}>
          <label>Disciplina<select name="courseId" required defaultValue={teacherCourses[0]?.id}>{teacherCourses.map((course) => <option value={course.id} key={course.id}>{course.name}</option>)}</select></label>
          <label>Título<input name="title" placeholder={mode === 'material' ? 'Ex.: Referências de interface' : 'Ex.: Protótipo final'} required /></label>
          <label className="form-full">Descrição<textarea name="description" placeholder="Adicione uma breve orientação para a turma" rows={3} required /></label>
          {mode === 'material' ? <label>Formato<select name="kind"><option>PDF</option><option>Slides</option><option>Guia</option><option>Link</option></select></label> : <label>Prazo<input type="date" name="dueDate" min={new Date().toISOString().slice(0, 10)} required /></label>}
          <div className="form-submit form-full">{feedback && <FormMessage>{feedback}</FormMessage>}<button className="button button-primary" type="submit">{mode === 'material' ? <><Send /> Publicar material</> : <><Plus /> Criar atividade</>}</button></div>
        </form>
      </Panel>}
      <div className="content-columns">
        <Panel title="Materiais disponíveis" description={`${materials.length} materiais para consulta`}>
          {materials.length ? <div className="resource-list">{materials.map((material) => { const course = courseFor(material.courseId); return <article className="resource-card" key={material.id}><span className={`resource-icon tone-${course?.color ?? 'blue'}`}><FileText /></span><div className="resource-copy"><div className="resource-meta"><StatusPill tone="info">{material.kind}</StatusPill><span>{formatDate(material.publishedAt)}</span></div><h3>{material.title}</h3><p>{material.description}</p><span className="resource-course"><BookOpen />{course?.name}</span></div>{!isTeacher && <button className="icon-button download-button" aria-label={`Abrir ${material.title}`} onClick={() => setFeedback(`Material “${material.title}” selecionado para consulta.`)}><Download /></button>}</article> })}</div> : <div className="empty-state"><span className="empty-mark">—</span><strong>Nenhum material disponível</strong><p>Os novos materiais publicados para suas turmas aparecerão aqui.</p></div>}
        </Panel>
        <Panel title={isTeacher ? 'Atividades das turmas' : 'Atividades'} description={isTeacher ? 'Prazos e atividades publicadas' : 'Acompanhe o que precisa ser entregue'}>
          {activities.length ? <div className="activity-list">{activities.map((activity) => { const course = courseFor(activity.courseId); return <article className={`activity-card ${activity.completed ? 'activity-done' : ''}`} key={activity.id}><div className="activity-card-top"><span className={`activity-check ${activity.completed ? 'activity-check-done' : ''}`}>{activity.completed ? <Check /> : <Circle />}</span><StatusPill tone={activity.completed ? 'success' : 'warning'}>{activity.completed ? 'Concluída' : isTeacher ? 'Aberta' : 'Pendente'}</StatusPill></div><h3>{activity.title}</h3><p>{activity.description}</p><div className="activity-card-foot"><span>{course?.name}</span><span><CalendarDays />{formatDate(activity.dueDate)}</span></div>{!isTeacher && !activity.completed && <button className="button button-secondary button-small" onClick={() => { dispatchData({ type: 'complete-activity', id: activity.id }); setFeedback('Atividade marcada como concluída.') }}>Marcar como concluída <Check /></button>}</article> })}</div> : <div className="empty-state"><span className="empty-mark">—</span><strong>Sem atividades</strong><p>As atividades publicadas pelas suas turmas aparecerão aqui.</p></div>}
        </Panel>
      </div>
      {!isTeacher && feedback && <div className="floating-feedback" role="status">{feedback}<button aria-label="Dispensar mensagem" onClick={() => setFeedback('')}>×</button></div>}
    </div>
  )
}
