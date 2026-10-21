import { useState, type FormEvent } from 'react'
import { Bell, Check, Megaphone, Send } from 'lucide-react'
import { PageHeader, Panel, StatusPill, FormMessage, EmptyState } from '@/components/shared/ui'
import { usePortal } from '@/context/PortalContext'
import { formatDate } from '@/utils/format'

export default function CommunicationPage() {
  const { user, data, dispatchData } = usePortal()
  const isTeacher = user?.role === 'professor'
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const announcements = isTeacher ? data.announcements.filter((item) => !item.courseId || ['c1', 'c3'].includes(item.courseId)) : data.announcements

  function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const title = String(form.get('title')).trim()
    const content = String(form.get('content')).trim()
    if (title.length < 4 || content.length < 10) {
      setError('Informe um título com pelo menos 4 caracteres e um conteúdo com pelo menos 10 caracteres.')
      return
    }
    dispatchData({ type: 'announcement', value: { id: `n-${Date.now()}`, title, content, kind: 'announcement', courseId: String(form.get('courseId')), publishedAt: new Date().toISOString().slice(0, 10), author: user?.name ?? 'Professor', read: false } })
    event.currentTarget.reset()
    setError('')
    setFeedback('Comunicado publicado para a turma selecionada.')
  }

  return (
    <div className="page-stack">
      <PageHeader eyebrow="MURAL ACADÊMICO" title={isTeacher ? 'Comunicados' : 'Comunicados e notificações'} description={isTeacher ? 'Compartilhe informações importantes com suas turmas.' : 'Acompanhe as novidades da instituição e das suas disciplinas.'} />
      {isTeacher && <Panel title="Publicar comunicado" description="O comunicado será destinado à turma escolhida" className="form-panel"><form className="content-form announcement-form" onSubmit={publish}><label>Turma<select name="courseId" required defaultValue="c1">{data.courses.filter((course) => ['c1', 'c3'].includes(course.id)).map((course) => <option value={course.id} key={course.id}>{course.name}</option>)}</select></label><label>Título<input name="title" placeholder="Ex.: Alteração no horário de atendimento" required maxLength={90} /></label><label className="form-full">Mensagem<textarea name="content" rows={3} placeholder="Escreva uma mensagem clara para os estudantes" required maxLength={500} /></label><div className="form-submit form-full">{error && <FormMessage kind="error">{error}</FormMessage>}{feedback && <FormMessage>{feedback}</FormMessage>}<button type="submit" className="button button-primary"><Send /> Publicar comunicado</button></div></form></Panel>}
      <Panel title={isTeacher ? 'Publicados por você e pela instituição' : 'Seu mural'} description={isTeacher ? 'Comunicados das suas turmas e avisos institucionais' : `${data.announcements.filter((item) => !item.read).length} notificações não lidas`}>
        {announcements.length ? <div className="communication-list">{announcements.map((item) => { const course = data.courses.find((entry) => entry.id === item.courseId); return <article className={`communication-card ${!item.read ? 'communication-unread' : ''}`} key={item.id}><span className={`communication-icon ${item.kind === 'announcement' ? 'communication-course' : ''}`}>{item.kind === 'announcement' ? <Megaphone /> : <Bell />}</span><div className="communication-content"><div className="communication-meta"><StatusPill tone={item.kind === 'announcement' ? 'info' : 'neutral'}>{item.kind === 'announcement' ? course?.name ?? 'Comunicado institucional' : 'Notificação individual'}</StatusPill><span>{formatDate(item.publishedAt)}</span>{!item.read && <StatusPill tone="warning">Não lida</StatusPill>}</div><h3>{item.title}</h3><p>{item.content}</p><small>Publicado por {item.author}</small></div>{!item.read && <button className="button button-secondary button-small mark-read" onClick={() => dispatchData({ type: 'read-announcement', id: item.id })}><Check /> Marcar como lida</button>}</article> })}</div> : <EmptyState title="Nenhum comunicado ainda" description="Quando houver uma novidade, ela será exibida neste mural." />}
      </Panel>
    </div>
  )
}
