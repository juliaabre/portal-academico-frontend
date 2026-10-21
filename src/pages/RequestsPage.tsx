import { useState, type FormEvent } from 'react'
import { Check, ClipboardList, Plus, Send } from 'lucide-react'
import { PageHeader, Panel, StatusPill, FormMessage, EmptyState } from '@/components/shared/ui'
import { usePortal } from '@/context/PortalContext'
import { createRequest } from '@/services/api/student-service'
import { formatDate } from '@/utils/format'

const requestTypes = ['Declaração de matrícula', 'Aproveitamento de disciplina', 'Revisão de nota', 'Atualização cadastral', 'Outro']

export default function RequestsPage() {
  const { user, data, dispatchData } = usePortal()
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const isStudent = user?.role === 'aluno'

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const type = String(form.get('type'))
    const subject = String(form.get('subject')).trim()
    const description = String(form.get('description')).trim()
    if (subject.length < 4 || description.length < 12) return
    dispatchData({ type: 'request', value: createRequest({ type, subject, description }) })
    event.currentTarget.reset()
    setOpen(false)
    setFeedback('Solicitação enviada. Você poderá acompanhar o andamento nesta página.')
  }

  return (
    <div className="page-stack">
      <PageHeader eyebrow="ATENDIMENTO ACADÊMICO" title="Solicitações acadêmicas" description={isStudent ? 'Abra uma solicitação e acompanhe as atualizações da equipe acadêmica.' : 'Esta área é destinada às solicitações acadêmicas dos estudantes.'} action={isStudent && <button className="button button-primary" onClick={() => { setOpen((value) => !value); setFeedback('') }}>{open ? 'Fechar formulário' : <><Plus /> Nova solicitação</>}</button>} />
      {!isStudent ? <Panel title="Área do estudante" description="Solicitações acadêmicas são registradas pelo perfil de aluno."><EmptyState title="Acesso não disponível para este perfil" description="O acompanhamento de solicitações está disponível para estudantes." /></Panel> : <>
        {feedback && <FormMessage>{feedback}</FormMessage>}
        {open && <Panel title="Nova solicitação" description="Descreva seu pedido para que a equipe possa orientá-lo" className="form-panel"><form className="request-form" onSubmit={submit}><label>Tipo de solicitação<select name="type" required>{requestTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label>Assunto<input name="subject" placeholder="Resuma o motivo do pedido" minLength={4} maxLength={100} required /></label><label>Descrição<textarea name="description" placeholder="Inclua os detalhes importantes para análise" rows={4} minLength={12} maxLength={700} required /></label><div className="form-submit"><button className="button button-primary" type="submit"><Send /> Enviar solicitação</button></div></form></Panel>}
        <Panel title="Solicitações anteriores" description={`${data.requests.length} registros no seu histórico`}>
          {data.requests.length ? <div className="request-list">{data.requests.map((request) => <article className="request-card" key={request.id}><div className="request-card-top"><span className="request-icon"><ClipboardList /></span><div className="request-id"><strong>{request.subject}</strong><span>{request.id} · {request.type}</span></div><StatusPill tone={request.status === 'Atendida' ? 'success' : request.status === 'Indeferida' ? 'danger' : 'warning'}>{request.status}</StatusPill></div><p>{request.description}</p><div className="request-card-bottom"><span>Enviada em {formatDate(request.date)}</span>{request.status === 'Atendida' && <span className="request-resolved"><Check /> Solicitação concluída</span>}</div></article>)}</div> : <EmptyState title="Você ainda não tem solicitações" description="Use “Nova solicitação” para registrar seu primeiro pedido." />}
        </Panel>
      </>}
    </div>
  )
}
