
export const studentMocks = {
  subjects: [
    { id: 'matematica', code: 'MAT-402', name: 'Matemática Avançada', teacher: 'Prof. Ricardo Mendes', color: 'bg-blue-500', icon: 'functions', grade: 9.2, attendance: 98 },
    { id: 'algoritmos', code: 'CC-105', name: 'Algoritmos e Estrutura de Dados', teacher: 'Prof. Carlos Silveira', color: 'bg-emerald-500', icon: 'code', grade: 8.1, attendance: 92 },
    { id: 'fisica', code: 'FIS-301', name: 'Física Quântica', teacher: 'Prof. Alberto Rocha', color: 'bg-purple-500', icon: 'flare', grade: 8.8, attendance: 100 },
    { id: 'historia', code: 'HIS-102', name: 'História Geral', teacher: 'Profa. Ana Claudia', color: 'bg-amber-500', icon: 'history_edu', grade: 8.0, attendance: 95 },
  ],
  announcements: [
    { id: 'ann-001', scope: 'global', title: 'Início da Rematrícula 2024', date: 'HOJE', body: 'O prazo para renovação de matrícula para o primeiro semestre de 2024 já está aberto. Acesse a aba Financeiro para realizar o pagamento da primeira parcela e garantir sua vaga.', importance: 'Alta', read: false },
    { id: 'ann-002', scope: 'subject', subjectId: 'matematica', title: 'Monitoria de Cálculo', date: 'ONTEM', body: 'Lembramos que a monitoria presencial ocorre todas as quartas-feiras às 14:00 na sala 402. Tragam suas dúvidas sobre integrais.', importance: 'Média', read: true },
    { id: 'ann-003', scope: 'global', title: 'Alteração no Cronograma de Provas', date: '12 NOV', body: 'As provas de segunda chamada do curso de engenharia foram postergadas para o dia 20 de novembro devido à manutenção no bloco B.', importance: 'Alta', read: false },
  ],
  activities: {
    'matematica': [
      { id: 'act-1', title: 'P1 - Álgebra Linear', type: 'Prova', date: '15 mar, 2024', status: 'Finalizada', weight: '2.0' },
      { id: 'act-2', title: 'Trabalho de Geometria', type: 'Trabalho', date: '22 abr, 2024', status: 'Pendente', weight: '3.0' },
      { id: 'act-3', title: 'Lista de Exercícios 3', type: 'Exercício', date: '10 mai, 2024', status: 'Prevista', weight: '1.0' },
    ],
    'algoritmos': [
      { id: 'act-4', title: 'Checkpoint 1', type: 'Desafio', date: '01 mar, 2024', status: 'Finalizada', weight: '5.0' },
    ]
  },
  grades: {
    'matematica': [
      { id: 'g1', title: 'P1 - Álgebra Linear', grade: '8.5', status: 'Publicado', obs: 'Excelente domínio.' },
      { id: 'g2', title: 'P2 - Geometria', grade: '-', status: 'Não Publicado', obs: 'Notas em processamento.' },
    ]
  },
  materials: {
    'matematica': [
      { id: 'm1', name: 'Apostila de Matrizes.pdf', type: 'PDF', date: '10/02/2024' },
      { id: 'm2', name: 'Vídeo Aula - Determinantes', type: 'Link', date: '12/02/2024' },
    ]
  }
};
