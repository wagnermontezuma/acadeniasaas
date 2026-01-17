
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { teacherStore } from '../../data/teacherMocks.ts';

const ProfessorEnvioDetalhe: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const submission = teacherStore.submissions.find(s => s.id === id);
  const events = teacherStore.submissionEvents[id || ''] || [];
  const turma = teacherStore.classes.find(c => c.id === submission?.classId);

  if (!submission) {
    return (
      <Layout role={UserRole.PROFESSOR}>
        <div className="p-20 text-center flex flex-col items-center">
           <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">search_off</span>
           <h2 className="text-xl font-black">Envio não encontrado</h2>
           <button onClick={() => navigate(-1)} className="mt-4 text-primary font-bold hover:underline">Voltar para Turma</button>
        </div>
      </Layout>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved': 
      case 'aprovado': return { label: 'Aprovado', color: 'bg-emerald-500/10 text-emerald-500', icon: 'check_circle' };
      case 'returned':
      case 'devolvido': return { label: 'Devolvido', color: 'bg-red-500/10 text-red-500', icon: 'assignment_return' };
      case 'sent':
      case 'em_analise': return { label: 'Em Análise', color: 'bg-amber-500/10 text-amber-500', icon: 'hourglass_top' };
      default: return { label: 'Rascunho', color: 'bg-slate-100 text-slate-500', icon: 'edit' };
    }
  };

  const statusCfg = getStatusConfig(submission.status);

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
          <Link to="/professor/dashboard" className="hover:text-primary">Dashboard</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          {turma && (
            <>
              <Link to={`/professor/turmas/${turma.id}`} className="hover:text-primary">{turma.name}</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
            </>
          )}
          <span className="text-slate-900 dark:text-white">Detalhe do Protocolo</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={`size-16 rounded-[24px] ${statusCfg.color.split(' ')[1].replace('text-', 'bg-')} text-white flex items-center justify-center shrink-0 shadow-xl opacity-80`}>
              <span className="material-symbols-outlined text-4xl">{statusCfg.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{submission.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${statusCfg.color}`}>{statusCfg.label}</span>
                <span className="size-1 bg-slate-300 rounded-full"></span>
                <p className="text-sm font-bold text-slate-500">Protocolo: <span className="text-slate-700 dark:text-slate-300">#{submission.id}</span></p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            Voltar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
             <h3 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-base">info</span>
                Resumo do Envio
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Turma Origem</p>
                      <p className="text-sm font-black">{turma?.name || 'Não informada'}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Disciplina</p>
                      <p className="text-sm font-black">{turma?.subject || 'Não informada'}</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Itens / Alunos Processados</p>
                      <p className="text-sm font-black">{submission.studentCount || 0} Registros</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Data de Criação</p>
                      <p className="text-sm font-black">{submission.createdAt}</p>
                   </div>
                </div>
             </div>

             {/* Fix: line 112/116 submission.feedback now exists in interface */}
             {submission.feedback && (
               <div className="mt-10 p-6 bg-primary/5 rounded-3xl border-l-4 border-primary">
                  <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-2">Comentário da Coordenação</p>
                  <p className="text-sm font-medium italic text-slate-600 dark:text-slate-300 leading-relaxed">
                    "{submission.feedback}"
                  </p>
               </div>
             )}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-base">history</span>
                Linha do Tempo
            </h3>
            
            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100 dark:before:bg-white/5">
               {events.map((event, idx) => (
                 <div key={event.id} className="relative pl-10">
                    <div className={`absolute left-0 top-1.5 size-6 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-sm ${
                      idx === 0 ? 'bg-primary text-white scale-110' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}>
                      <span className="material-symbols-outlined text-[10px] font-black">
                        {event.actorRole === 'COORD' ? 'verified' : event.actorRole === 'TEACHER' ? 'person' : 'settings'}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                       <div>
                          <p className="text-sm font-black text-slate-900 dark:text-white">{event.action}</p>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{event.actorName} ({event.actorRole})</p>
                       </div>
                       <span className="text-[10px] font-black text-slate-400 whitespace-nowrap">{event.at}</span>
                    </div>
                    {event.note && (
                       <p className="mt-2 text-xs font-medium text-slate-500 leading-relaxed bg-slate-50 dark:bg-white/2 p-3 rounded-xl border border-transparent dark:border-white/5">{event.note}</p>
                    )}
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">Próximos Passos</h3>
              <div className="space-y-4">
                 {/* Fix: line 159 removed Portuguese status key 'devolvido' */}
                 {submission.status === 'returned' ? (
                   <>
                    <button 
                      onClick={() => navigate(`/professor/notas?turma=${submission.classId}`)}
                      className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                    >
                       <span className="material-symbols-outlined">edit_square</span>
                       Corrigir Lançamento
                    </button>
                    <p className="text-[10px] font-medium text-center text-slate-400 leading-relaxed px-4">
                      Seu envio foi devolvido. Clique acima para ajustar as notas e enviar novamente.
                    </p>
                   </>
                 ) : /* Fix: line 172 removed Portuguese status key 'aprovado' */
                 submission.status === 'approved' ? (
                   <div className="text-center space-y-4">
                      <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                        <span className="material-symbols-outlined text-3xl">verified</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed">
                        Este protocolo foi finalizado. As notas já estão disponíveis para os alunos.
                      </p>
                      <button className="w-full py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">Imprimir Comprovante</button>
                   </div>
                 ) : (
                   <div className="text-center space-y-4">
                      <div className="size-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto animate-pulse">
                        <span className="material-symbols-outlined text-3xl">hourglass_empty</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed">
                        Aguardando revisão da coordenação pedagógica. Você será notificado sobre atualizações.
                      </p>
                   </div>
                 )}
              </div>
           </div>

           <div className="p-8 bg-slate-900 dark:bg-[#1a2b2b] rounded-[32px] text-white relative overflow-hidden group">
              <div className="relative z-10">
                 <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-4 text-primary">Precisa de Ajuda?</h4>
                 <p className="text-xs font-medium text-slate-400 leading-relaxed mb-6">Conteste uma devolução ou tire dúvidas sobre o processo de homologação.</p>
                 <button className="w-full py-3.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Abrir Chamado Interno</button>
              </div>
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-9xl opacity-5 rotate-12 group-hover:rotate-0 transition-transform">support_agent</span>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessorEnvioDetalhe;
