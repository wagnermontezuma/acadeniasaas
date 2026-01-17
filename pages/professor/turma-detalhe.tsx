
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { teacherStore, Student, Evaluation, SubmissionRecord } from '../../data/teacherMocks.ts';

type TabType = 'alunos' | 'avaliacoes' | 'notas' | 'envios';

const ProfessorTurmaDetalhe: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('alunos');
  
  const [evaluations, setEvaluations] = useState<Evaluation[]>(teacherStore.evaluations.filter(e => e.classId === id));
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(teacherStore.submissions.filter(s => s.classId === id));
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const turma = teacherStore.classes.find(c => c.id === id);
  const alunos = teacherStore.studentsByClass[id || ''] || [];

  if (!turma) return <Layout role={UserRole.PROFESSOR}><div className="p-20 text-center text-muted-foreground">Turma não encontrada.</div></Layout>;

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-4">
          <Link to="/professor/turmas" className="hover:text-primary transition-colors">Minhas Turmas</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-foreground">{turma.name}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={`size-16 rounded-[24px] ${turma.color} text-white flex items-center justify-center shrink-0 shadow-xl`}>
              <span className="material-symbols-outlined text-4xl">school</span>
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">{turma.name}</h1>
              <p className="text-muted-foreground font-medium mt-1 uppercase text-xs tracking-tight">{turma.subject} • {turma.shift} • {alunos.length} Alunos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-b border-border mb-8 overflow-x-auto gap-10">
        {[
          { id: 'alunos', label: 'Alunos', icon: 'person' },
          { id: 'avaliacoes', label: 'Avaliações', icon: 'assignment' },
          { id: 'notas', label: 'Lançar Notas', icon: 'edit_note' },
          { id: 'envios', label: 'Envios para Aprovação', icon: 'task_alt' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px] animate-in fade-in duration-300">
        {activeTab === 'alunos' && (
          <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">RA</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Aluno</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-center">Situação</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-right">Visualizar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {alunos.map((aluno) => (
                  <tr key={aluno.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-8 py-6 text-xs font-bold text-muted-foreground uppercase">{aluno.code}</td>
                    <td className="px-8 py-6 font-black text-sm text-foreground">{aluno.name}</td>
                    <td className="px-8 py-6 text-center">
                       <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${aluno.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'}`}>{aluno.status}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="size-9 rounded-xl bg-muted text-muted-foreground hover:text-primary transition-all flex items-center justify-center ml-auto">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'envios' && (
           <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-muted/50 border-b border-border">
                 <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">ID / Lançamento</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Criado em</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-right">Ação</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border">
                 {submissions.length > 0 ? submissions.map(sub => (
                   <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-8 py-6">
                         <p className="text-sm font-black text-foreground">{sub.title}</p>
                         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Ref: {sub.evaluationId}</p>
                      </td>
                      <td className="px-8 py-6 text-xs font-bold text-muted-foreground uppercase">{sub.createdAt}</td>
                      <td className="px-8 py-6">
                         <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                           sub.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 
                           (sub.status === 'sent' || sub.status === 'review') ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 
                           'bg-red-500/10 text-red-600 dark:text-red-400'
                         }`}>
                           {(sub.status === 'sent' || sub.status === 'review') ? 'Em Revisão' : sub.status === 'approved' ? 'Aprovado' : 'Devolvido'}
                         </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <Link to={`/professor/envios?id=${sub.id}`} className="text-[10px] font-black text-primary uppercase hover:underline transition-all tracking-widest">
                            Ver Detalhes
                         </Link>
                      </td>
                   </tr>
                 )) : (
                   <tr><td colSpan={4} className="p-20 text-center text-muted-foreground italic uppercase text-xs font-black tracking-widest opacity-40">Nenhum envio registrado.</td></tr>
                 )}
               </tbody>
             </table>
           </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfessorTurmaDetalhe;
