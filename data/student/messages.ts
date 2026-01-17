
export type UserRoleType = "COORD" | "TEACHER" | "SECRETARY" | "STUDENT";

export interface Participant {
  id: string;
  name: string;
  role: UserRoleType;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  body: string;
  sentAt: string;
  status: "sent" | "delivered" | "read";
}

export interface Thread {
  id: string;
  participants: Participant[];
  lastMessageAt: string;
  unreadCount: number;
  preview: string;
  schoolScope?: { schoolId: string, schoolName: string };
}

export const CURRENT_STUDENT_ID = "alu_lucas_silva";

export const messageMocks: { threads: Thread[]; messages: Message[]; contacts: Participant[] } = {
  contacts: [
    { id: "coord_joao", name: "João Santos", role: "COORD", avatarUrl: "https://i.pravatar.cc/150?img=12" },
    { id: "sec_alfa", name: "Secretaria Acadêmica", role: "SECRETARY", avatarUrl: "https://i.pravatar.cc/150?img=25" },
    { id: "prof_ricardo", name: "Ricardo Mendes", role: "TEACHER", avatarUrl: "https://i.pravatar.cc/150?u=prof" },
    { id: "prof_ana", name: "Ana Claudia", role: "TEACHER", avatarUrl: "https://i.pravatar.cc/150?img=47" },
  ],
  threads: [
    {
      id: "thr_joao_santos",
      participants: [
        { id: "coord_joao", name: "João Santos", role: "COORD", avatarUrl: "https://i.pravatar.cc/150?img=12" }
      ],
      lastMessageAt: "10:45",
      unreadCount: 1,
      preview: "Ricardo, os lançamentos do 2º bimestre foram aprovados.",
    },
    {
      id: "thr_secretaria_alfa",
      participants: [
        { id: "sec_alfa", name: "Secretaria Acadêmica", role: "SECRETARY", avatarUrl: "https://i.pravatar.cc/150?img=25" }
      ],
      lastMessageAt: "Ontem",
      unreadCount: 0,
      preview: "Documento pendente de assinatura referente à rematrícula.",
    },
    {
      id: "thr_prof_ricardo",
      participants: [
        { id: "prof_ricardo", name: "Ricardo Mendes", role: "TEACHER", avatarUrl: "https://i.pravatar.cc/150?u=prof" }
      ],
      lastMessageAt: "08:20",
      unreadCount: 0,
      preview: "Dúvida sobre o trabalho de Cálculo II.",
    }
  ],
  messages: [
    // Thread João Santos
    { id: "m1", threadId: "thr_joao_santos", senderId: CURRENT_STUDENT_ID, body: "Bom dia, gostaria de saber o status da revisão das notas.", sentAt: "09:15", status: "read" },
    { id: "m2", threadId: "thr_joao_santos", senderId: "coord_joao", body: "Estamos finalizando a verificação dos diários.", sentAt: "09:30", status: "read" },
    { id: "m3", threadId: "thr_joao_santos", senderId: "coord_joao", body: "Ricardo, os lançamentos do 2º bimestre foram aprovados.", sentAt: "10:45", status: "delivered" },
    
    // Thread Secretaria
    { id: "m4", threadId: "thr_secretaria_alfa", senderId: "sec_alfa", body: "Olá Lucas, notamos que seu contrato de rematrícula ainda não foi assinado digitalmente.", sentAt: "Ontem 14:00", status: "read" },
    { id: "m5", threadId: "thr_secretaria_alfa", senderId: CURRENT_STUDENT_ID, body: "Vou verificar agora mesmo, obrigado.", sentAt: "Ontem 14:10", status: "read" },
    
    // Thread Prof Ricardo
    { id: "m6", threadId: "thr_prof_ricardo", senderId: CURRENT_STUDENT_ID, body: "Professor, pode me tirar uma dúvida sobre a P2?", sentAt: "08:00", status: "read" },
    { id: "m7", threadId: "thr_prof_ricardo", senderId: "prof_ricardo", body: "Claro, Lucas. Qual parte de integrais você está com dificuldade?", sentAt: "08:15", status: "read" },
    { id: "m8", threadId: "thr_prof_ricardo", senderId: CURRENT_STUDENT_ID, body: "Na parte de substituição trigonométrica.", sentAt: "08:20", status: "read" },
  ]
};
