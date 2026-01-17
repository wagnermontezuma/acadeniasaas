
export interface TeacherClass {
  id: string;
  name: string;
  shift: 'Matutino' | 'Vespertino' | 'Noturno' | 'Integral';
  periodLabel: string;
  subject: string;
  studentsCount: number;
  status: 'Ativa' | 'Concluída';
  color: string;
}

export interface Student {
  id: string;
  name: string;
  code: string;
  avatar?: string;
  status: 'Ativo' | 'Pendente' | 'Inativo';
  performance?: {
    avg: number;
    absences: number;
    lastGrades: { title: string, value: number }[];
  }
}

export interface Evaluation {
  id: string;
  classId: string;
  title: string;
  type: 'Prova' | 'Trabalho' | 'Atividade' | 'Simulado';
  date: string;
  weight: number;
  status: 'draft' | 'published' | 'sent';
  observations?: string;
}

export interface SubmissionComment {
  id: string;
  at: string;
  author: {
    id: string;
    name: string;
    role: "TEACHER" | "COORD";
    avatar?: string;
  };
  body: string;
}

export interface SubmissionEvent {
  id: string;
  at: string;
  actorRole: "TEACHER" | "COORD" | "SYSTEM";
  actorName: string;
  action: string;
  note?: string;
}

export interface SubmissionRecord {
  id: string;
  title: string;
  ref: string;
  classId?: string;
  classLabel?: string;
  type: "notas" | "plano" | "relatorio";
  createdAt: string;
  sentAt?: string;
  lastUpdateAt: string;
  status: "draft" | "sent" | "review" | "approved" | "returned";
  unreadFeedbackCount: number;
  studentCount?: number;
  // Added evaluationId and feedback to fix type errors in components
  evaluationId?: string;
  feedback?: string;
  returnedFeedback?: {
    reason: string;
    requestedChanges: string[];
  };
}

export type Submission = SubmissionRecord;

export interface NextAction {
  id: string;
  type: 'grade' | 'prepare' | 'report';
  classId: string;
  evaluationId?: string;
  title: string;
  subtitle: string;
  dueLabel: string;
}

export const teacherStore = {
  classes: [
    { id: '9a_mat', name: '9º Ano A', shift: 'Matutino', periodLabel: '2024.1', subject: 'Matemática', studentsCount: 32, status: 'Ativa', color: 'bg-blue-500' },
    { id: '1b_fis', name: '1º EM B', shift: 'Vespertino', periodLabel: '2024.1', subject: 'Física', studentsCount: 28, status: 'Ativa', color: 'bg-emerald-500' },
    { id: '2a_mat', name: '2º EM A', shift: 'Matutino', periodLabel: '2024.1', subject: 'Matemática Avançada', studentsCount: 45, status: 'Ativa', color: 'bg-purple-500' },
  ] as TeacherClass[],

  studentsByClass: {
    '9a_mat': [
      { id: 'std_1', name: 'Alexandre Mendonça', code: '2024001', status: 'Ativo', performance: { avg: 8.5, absences: 2, lastGrades: [{title: 'P1', value: 8.5}, {title: 'T1', value: 9.0}] } },
      { id: 'std_2', name: 'Beatriz Helena Santos', code: '2024002', status: 'Ativo', performance: { avg: 4.2, absences: 8, lastGrades: [{title: 'P1', value: 4.2}, {title: 'T1', value: 5.0}] } },
      { id: 'std_3', name: 'Carlos Eduardo Lima', code: '2024003', status: 'Pendente' },
      { id: 'std_4', name: 'Daniela Martins', code: '2024004', status: 'Ativo', performance: { avg: 9.8, absences: 0, lastGrades: [{title: 'P1', value: 9.8}, {title: 'T1', value: 10}] } },
    ] as Student[]
  } as Record<string, Student[]>,

  evaluations: [
    { id: 'eva_1', classId: '9a_mat', title: 'Prova Bimestral 1', type: 'Prova', date: '2024-03-15', weight: 10, status: 'published' },
    { id: 'eva_2', classId: '9a_mat', title: 'Trabalho de Geometria', type: 'Trabalho', date: '2024-04-10', weight: 10, status: 'draft' },
  ] as Evaluation[],

  submissions: [
    { 
      id: 'sub_01', 
      title: 'Notas P1 - 9º Ano A', 
      ref: 'Bimestre 1', 
      classId: '9a_mat',
      classLabel: '9º Ano A',
      type: 'notas',
      createdAt: '2024-03-15',
      sentAt: '2024-03-20',
      lastUpdateAt: 'Hoje, 10:00',
      status: 'approved',
      unreadFeedbackCount: 0,
      studentCount: 32
    },
    { 
      id: 'sub_02', 
      title: 'Plano Bimestral 2 - Matemática', 
      ref: 'Ciclo 2024.1', 
      classId: '9a_mat',
      classLabel: '9º Ano A',
      type: 'plano',
      createdAt: '2024-03-21',
      sentAt: '2024-03-22',
      lastUpdateAt: 'Ontem, 16:00',
      status: 'returned',
      unreadFeedbackCount: 1,
      returnedFeedback: {
        reason: 'Falta de alinhamento com as competências da BNCC.',
        requestedChanges: [
          'Incluir códigos das habilidades da BNCC no tópico 4.2',
          'Detallar a matriz de avaliação somativa'
        ]
      }
    },
    { 
      id: 'sub_03', 
      title: 'Notas T1 - 1º EM B', 
      ref: 'Bimestre 1', 
      classId: '1b_fis',
      classLabel: '1º EM B',
      type: 'notas',
      createdAt: '2024-03-23',
      sentAt: '2024-03-24',
      lastUpdateAt: 'Há 2 horas',
      status: 'review',
      unreadFeedbackCount: 0,
      studentCount: 28
    },
    { 
      id: 'sub_04', 
      title: 'Relatório Mensal de Desempenho', 
      ref: 'Março', 
      type: 'relatorio',
      createdAt: '2024-03-25',
      lastUpdateAt: 'Hoje, 08:00',
      status: 'draft',
      unreadFeedbackCount: 0
    },
  ] as SubmissionRecord[],

  submissionEvents: {
    'sub_01': [
      { id: 'e1', at: '20/03/2024 09:00', actorRole: 'TEACHER', actorName: 'Ricardo Silveira', action: 'Protocolo Criado' },
      { id: 'e2', at: 'Hoje, 10:00', actorRole: 'COORD', actorName: 'Mariana Costa', action: 'Aprovado e Publicado' }
    ],
    'sub_02': [
      { id: 'e3', at: '21/03/2024 15:00', actorRole: 'TEACHER', actorName: 'Ricardo Silveira', action: 'Protocolo Criado' },
      { id: 'e4', at: 'Ontem, 16:00', actorRole: 'COORD', actorName: 'Mariana Costa', action: 'Devolvido para Ajuste' }
    ]
  } as Record<string, SubmissionEvent[]>,

  submissionComments: {
    'sub_02': [
      { id: 'c1', at: 'Ontem, 16:05', author: { id: 'coord_1', name: 'Mariana Costa', role: 'COORD' }, body: 'Ricardo, os objetivos estão claros, mas precisamos das tags da BNCC para conformidade com a secretaria estadual.' }
    ]
  } as Record<string, SubmissionComment[]>
};

export const teacherMocks = {
  ...teacherStore,
  nextActions: [
    { id: 'na_1', type: 'grade', classId: '9a_mat', evaluationId: 'eva_2', title: 'Lançar Notas: Trabalho de Geometria', subtitle: 'Turma 9º Ano A', dueLabel: 'Hoje' },
    { id: 'na_2', type: 'prepare', classId: '1b_fis', title: 'Preparar Aula: Cinemática', subtitle: 'Turma 1º EM B', dueLabel: 'Amanhã' },
    { id: 'na_3', type: 'report', classId: '9a_mat', title: 'Revisar Item Devolvido', subtitle: 'Notas P1 - Matemática', dueLabel: 'Urgente' },
  ] as NextAction[]
};
