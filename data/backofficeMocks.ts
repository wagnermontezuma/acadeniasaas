
export const backofficeMocks = {
  plans: [
    { id: 'plan_free', name: 'Free', priceMonthly: 0, pricePerStudent: 0, studentLimit: 50, isActive: true, features: ['Boletim Digital', '1 Professor'] },
    { id: 'plan_basic', name: 'Basic', priceMonthly: 299, pricePerStudent: 2, studentLimit: 200, isActive: true, features: ['Boletim Digital', 'Comunicação Interna', '5 Professores'] },
    { id: 'plan_pro', name: 'Pro', priceMonthly: 599, pricePerStudent: 1.5, studentLimit: 1000, isActive: true, features: ['Tudo do Basic', 'Relatórios IA', 'Suporte VIP', 'API'] },
    { id: 'plan_enterprise', name: 'Enterprise', priceMonthly: 1200, pricePerStudent: 1, studentLimit: 99999, isActive: true, features: ['Tudo do Pro', 'Whitelabel', 'Gestor de Conta'] },
  ],
  schools: [
    { id: 'sch_alfa_001', name: 'Colégio Alfa - Matriz', status: 'Ativa', planId: 'plan_pro', activeStudents: 840, createdAt: '2023-01-15', lastLoginAt: '2024-05-24 14:20', domain: 'alfa.academiasaas.com', adminEmail: 'admin@colegioalfa.com.br' },
    { id: 'sch_beta_002', name: 'Escola Beta Bilíngue', status: 'Ativa', planId: 'plan_enterprise', activeStudents: 1250, createdAt: '2023-03-10', lastLoginAt: '2024-05-24 09:15', domain: 'beta.academiasaas.com', adminEmail: 'diretoria@escolabeta.com' },
    { id: 'sch_gama_003', name: 'Instituto Gama de Ensino', status: 'Suspensa', planId: 'plan_basic', activeStudents: 150, createdAt: '2023-06-20', lastLoginAt: '2024-04-12 18:00', domain: 'gama.academiasaas.com', adminEmail: 'financeiro@institutogama.com' },
    { id: 'sch_delta_004', name: 'Delta High School', status: 'Trial', planId: 'plan_pro', activeStudents: 45, createdAt: '2024-05-01', lastLoginAt: '2024-05-23 11:30', domain: 'delta.academiasaas.com', adminEmail: 'ti@deltahigh.com' },
  ],
  payments: [
    { id: 'pay_001', schoolId: 'sch_alfa_001', amount: 1859.00, method: 'Cartão de Crédito', status: 'Aprovado', gateway: 'Asaas', createdAt: '2024-05-10', invoiceId: 'INV-99281' },
    { id: 'pay_002', schoolId: 'sch_beta_002', amount: 2450.00, method: 'Boleto', status: 'Pendente', gateway: 'Asaas', createdAt: '2024-05-22', invoiceId: 'INV-99285' },
    { id: 'pay_003', schoolId: 'sch_gama_003', amount: 599.00, method: 'Pix', status: 'Recusado', gateway: 'Pagar.me', createdAt: '2024-05-05', invoiceId: 'INV-99102' },
  ],
  gateways: [
    { id: 'gt_asaas_01', name: 'Asaas (Principal)', enabled: true, mode: 'Produção', webhookUrl: 'https://api.academiasaas.com/webhooks/asaas', updatedAt: '2024-05-01', maskedKey: 'ak_prod_••••••••x9z1' },
    { id: 'gt_pagarme_02', name: 'Pagar.me (Backup)', enabled: false, mode: 'Sandbox', webhookUrl: 'https://api.academiasaas.com/webhooks/pagarme', updatedAt: '2024-02-15', maskedKey: 'ak_test_••••••••a3b2' },
  ],
  auditLogs: [
    { id: 'log_01', scope: 'global', actor: 'Admin Global (Você)', action: 'Suspensão de Escola', severity: 'Alta', at: '2024-05-24 10:00', metadata: { school: 'Instituto Gama' } },
    { id: 'log_02', scope: 'school', schoolId: 'sch_alfa_001', actor: 'João Silva (Admin)', action: 'Alteração de Plano', severity: 'Média', at: '2024-05-23 15:30', metadata: { oldPlan: 'Basic', newPlan: 'Pro' } },
  ],
  tickets: [
    { id: 'tk_001', schoolId: 'sch_alfa_001', subject: 'Dúvida na importação de notas', status: 'Em andamento', priority: 'Alta', updatedAt: 'Hoje, 14:00', assignedTo: 'Suporte N2' },
    { id: 'tk_002', schoolId: 'sch_beta_002', subject: 'Solicitação de upgrade de limite', status: 'Aberto', priority: 'Média', updatedAt: 'Há 2 horas', assignedTo: 'Comercial' },
  ]
};
