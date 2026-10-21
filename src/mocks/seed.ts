import type { PortalData, PortalUser } from '@/types'

export const demoUsers: PortalUser[] = [
  {
    id: 'student-1',
    name: 'Mariana Costa',
    email: 'mariana.costa@portal.edu.br',
    role: 'aluno',
    course: 'Design Digital',
    registration: '202410284',
  },
  {
    id: 'teacher-1',
    name: 'Rafael Nogueira',
    email: 'rafael.nogueira@portal.edu.br',
    role: 'professor',
    course: 'Departamento de Tecnologia',
    registration: 'DOC-0391',
  },
]

export const initialPortalData: PortalData = {
  courses: [
    { id: 'c1', name: 'Design de Interfaces', code: 'DSG204', instructor: 'Prof. Rafael Nogueira', room: 'Lab. Criativo 02', workload: 60, color: 'blue' },
    { id: 'c2', name: 'Tipografia Digital', code: 'DSG218', instructor: 'Prof.ª Helena Martins', room: 'Sala 304', workload: 40, color: 'violet' },
    { id: 'c3', name: 'Experiência do Usuário', code: 'DSG231', instructor: 'Prof. Rafael Nogueira', room: 'Lab. Criativo 01', workload: 60, color: 'green' },
    { id: 'c4', name: 'Projeto Integrador II', code: 'DSG240', instructor: 'Prof.ª Camila Rocha', room: 'Ateliê 05', workload: 80, color: 'amber' },
  ],
  schedule: [
    { id: 's1', courseId: 'c1', day: 'Segunda-feira', start: '08:00', end: '09:40', room: 'Lab. Criativo 02' },
    { id: 's2', courseId: 'c3', day: 'Segunda-feira', start: '10:00', end: '11:40', room: 'Lab. Criativo 01' },
    { id: 's3', courseId: 'c2', day: 'Terça-feira', start: '09:00', end: '10:40', room: 'Sala 304' },
    { id: 's4', courseId: 'c4', day: 'Quarta-feira', start: '14:00', end: '16:30', room: 'Ateliê 05' },
    { id: 's5', courseId: 'c1', day: 'Quinta-feira', start: '08:00', end: '09:40', room: 'Lab. Criativo 02' },
    { id: 's6', courseId: 'c3', day: 'Sexta-feira', start: '10:00', end: '11:40', room: 'Lab. Criativo 01' },
  ],
  grades: [
    { id: 'g1', courseId: 'c1', assessment: 'Projeto de interface', score: 8.8, date: '2026-09-18' },
    { id: 'g2', courseId: 'c1', assessment: 'Avaliação heurística', score: 9.2, date: '2026-10-02' },
    { id: 'g3', courseId: 'c2', assessment: 'Exercício editorial', score: 7.6, date: '2026-09-20' },
    { id: 'g4', courseId: 'c2', assessment: 'Composição tipográfica', score: 8.4, date: '2026-10-04' },
    { id: 'g5', courseId: 'c3', assessment: 'Pesquisa com usuários', score: 9.1, date: '2026-09-25' },
    { id: 'g6', courseId: 'c3', assessment: 'Jornada do usuário', score: 8.7, date: '2026-10-08' },
    { id: 'g7', courseId: 'c4', assessment: 'Entrega da etapa 1', score: 8.2, date: '2026-10-01' },
  ],
  studentResults: [
    { id: 'r1', name: 'Mariana Costa', registration: '202410284', courseId: 'c1', average: 9.0, attendance: 96 },
    { id: 'r2', name: 'Lucas Almeida', registration: '202410317', courseId: 'c1', average: 8.4, attendance: 92 },
    { id: 'r3', name: 'Isabela Mendes', registration: '202410356', courseId: 'c1', average: 7.8, attendance: 89 },
    { id: 'r4', name: 'Pedro Henrique', registration: '202410391', courseId: 'c3', average: 8.7, attendance: 95 },
    { id: 'r5', name: 'Ana Clara Souza', registration: '202410408', courseId: 'c3', average: 9.3, attendance: 98 },
    { id: 'r6', name: 'Bruno Ferreira', registration: '202410425', courseId: 'c3', average: 7.2, attendance: 84 },
  ],
  materials: [
    { id: 'm1', courseId: 'c1', title: 'Fundamentos de design visual', description: 'Referências e princípios para construção de interfaces digitais.', publishedAt: '2026-10-09', kind: 'PDF' },
    { id: 'm2', courseId: 'c3', title: 'Roteiro de entrevista com usuários', description: 'Guia prático para preparar e conduzir entrevistas.', publishedAt: '2026-10-07', kind: 'Guia' },
    { id: 'm3', courseId: 'c2', title: 'Grid e composição editorial', description: 'Material de apoio sobre sistemas de grid tipográfico.', publishedAt: '2026-10-03', kind: 'Slides' },
  ],
  activities: [
    { id: 'a1', courseId: 'c1', title: 'Protótipo navegável', description: 'Entregue o protótipo das telas principais no Figma.', dueDate: '2026-10-18', completed: false },
    { id: 'a2', courseId: 'c3', title: 'Síntese das entrevistas', description: 'Organize os principais aprendizados da pesquisa.', dueDate: '2026-10-20', completed: false },
    { id: 'a3', courseId: 'c4', title: 'Apresentação do conceito', description: 'Apresente o conceito visual da equipe.', dueDate: '2026-10-24', completed: false },
    { id: 'a4', courseId: 'c2', title: 'Estudo de referências', description: 'Selecione e analise três projetos editoriais.', dueDate: '2026-10-08', completed: true },
  ],
  announcements: [
    { id: 'n1', title: 'Semana de apresentação dos projetos', content: 'A agenda de apresentações da etapa será disponibilizada no mural até sexta-feira.', kind: 'notification', courseId: null, publishedAt: '2026-10-14', author: 'Coordenação acadêmica', read: false },
    { id: 'n2', title: 'Laboratório criativo: novos horários', content: 'O laboratório estará aberto em horário estendido durante a semana de entregas.', kind: 'announcement', courseId: 'c1', publishedAt: '2026-10-12', author: 'Rafael Nogueira', read: false },
    { id: 'n3', title: 'Material de apoio publicado', content: 'O guia de entrevistas já está disponível na área de materiais da disciplina.', kind: 'announcement', courseId: 'c3', publishedAt: '2026-10-07', author: 'Rafael Nogueira', read: true },
  ],
  requests: [
    { id: 'REQ-2026-0148', type: 'Declaração de matrícula', subject: 'Declaração para estágio', description: 'Solicito declaração atualizada de matrícula para apresentar à empresa.', date: '2026-10-10', status: 'Em análise' },
    { id: 'REQ-2026-0092', type: 'Aproveitamento de disciplina', subject: 'Aproveitamento de tipografia', description: 'Análise de equivalência de disciplina cursada anteriormente.', date: '2026-09-22', status: 'Atendida' },
  ],
}
