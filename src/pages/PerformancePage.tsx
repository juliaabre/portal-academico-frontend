import { useMemo, useState } from 'react'
import { Award, BarChart3, CheckCircle2, ChevronDown, TrendingUp } from 'lucide-react'
import { PageHeader, Panel, StatCard, StatusPill } from '@/components/shared/ui'
import { usePortal } from '@/context/PortalContext'
import { formatDate } from '@/utils/format'

export default function PerformancePage() {
  const { user, data } = usePortal()
  const isTeacher = user?.role === 'professor'
  const [courseId, setCourseId] = useState('c1')
  const results = useMemo(() => data.studentResults.filter((student) => student.courseId === courseId), [data.studentResults, courseId])
  const average = data.grades.length ? data.grades.reduce((sum, grade) => sum + grade.score, 0) / data.grades.length : 0
  const attendance = 94

  return (
    <div className="page-stack">
      <PageHeader eyebrow="ACOMPANHAMENTO" title={isTeacher ? 'Desempenho das turmas' : 'Notas e desempenho'} description={isTeacher ? 'Acompanhe resultados e frequência dos estudantes das suas turmas.' : 'Acompanhe suas avaliações e veja como está seu progresso acadêmico.'} />
      <div className="stats-grid">
        <StatCard label={isTeacher ? 'Média das turmas' : 'Média geral'} value={isTeacher ? '8,4' : average.toFixed(1).replace('.', ',')} note="Média das avaliações registradas" icon={TrendingUp} tone="green" />
        <StatCard label="Frequência" value={isTeacher ? '92%' : `${attendance}%`} note={isTeacher ? 'Média das suas turmas' : 'Presença no período letivo'} icon={CheckCircle2} tone="blue" />
        <StatCard label={isTeacher ? 'Turmas acompanhadas' : 'Avaliações lançadas'} value={isTeacher ? '2' : data.grades.length} note={isTeacher ? 'Com resultados disponíveis' : 'Em todas as disciplinas'} icon={BarChart3} tone="violet" />
        <StatCard label={isTeacher ? 'Destaque da turma' : 'Melhor resultado'} value={isTeacher ? '9,3' : Math.max(...data.grades.map((grade) => grade.score)).toFixed(1).replace('.', ',')} note={isTeacher ? 'Maior média individual' : 'Na avaliação heurística'} icon={Award} tone="amber" />
      </div>
      {isTeacher ? <Panel title="Resultados por turma" description="Selecione uma turma para visualizar os resultados disponíveis" action={<label className="select-label"><span className="sr-only">Selecionar turma</span><select value={courseId} onChange={(event) => setCourseId(event.target.value)}>{data.courses.filter((course) => ['c1', 'c3'].includes(course.id)).map((course) => <option key={course.id} value={course.id}>{course.name}</option>)}</select><ChevronDown /></label>}>
        <div className="table-scroll"><table><thead><tr><th>Estudante</th><th>Matrícula</th><th>Média</th><th>Frequência</th><th>Acompanhamento</th></tr></thead><tbody>{results.map((student) => <tr key={student.id}><td><span className="student-cell"><span className="avatar avatar-table">{student.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span><strong>{student.name}</strong></span></td><td>{student.registration}</td><td><strong>{student.average.toFixed(1).replace('.', ',')}</strong></td><td>{student.attendance}%</td><td><StatusPill tone={student.average >= 8 ? 'success' : 'warning'}>{student.average >= 8 ? 'Bom progresso' : 'Acompanhar'}</StatusPill></td></tr>)}</tbody></table></div>
      </Panel> : <StudentGrades />}
      <Panel title={isTeacher ? 'Resumo do acompanhamento' : 'Como interpretar seus resultados'} description={isTeacher ? 'Dados apresentados para fins de acompanhamento acadêmico' : 'As notas exibidas refletem os lançamentos disponíveis no portal.'}>
        <div className="performance-note"><span className="note-icon"><Award /></span><div><strong>{isTeacher ? 'Acompanhe o percurso de cada estudante' : 'Seu progresso é feito de cada etapa'}</strong><p>{isTeacher ? 'Os indicadores são descritivos e não representam regras automatizadas de aprovação.' : 'As médias são apenas informativas e não substituem os critérios de avaliação definidos em cada disciplina.'}</p></div></div>
      </Panel>
    </div>
  )
}

function StudentGrades() {
  const { data } = usePortal()
  return <Panel title="Notas por disciplina" description="Avaliações registradas neste semestre" className="grades-panel">
    <div className="table-scroll"><table><thead><tr><th>Disciplina / avaliação</th><th>Data</th><th>Nota</th><th>Indicador</th></tr></thead><tbody>{data.grades.map((grade) => { const course = data.courses.find((item) => item.id === grade.courseId); return <tr key={grade.id}><td><span className="grade-course"><span className={`grade-dot tone-${course?.color ?? 'blue'}`} /><span><strong>{grade.assessment}</strong><small>{course?.name}</small></span></span></td><td>{formatDate(grade.date)}</td><td><strong className="grade-score">{grade.score.toFixed(1).replace('.', ',')}</strong></td><td><StatusPill tone={grade.score >= 8 ? 'success' : 'info'}>{grade.score >= 8 ? 'Bom resultado' : 'Registrada'}</StatusPill></td></tr> })}</tbody></table></div>
  </Panel>
}
