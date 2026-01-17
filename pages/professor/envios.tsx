
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { teacherStore, SubmissionRecord, SubmissionComment, SubmissionEvent } from '../../data/teacherMocks.ts';

type StatusFilter = 'all' | 'approved' | 'returned' | 'review' | 'draft';

const ProfessorEnvios: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(teacherStore.submissions);
  const [selectedSub, setSelectedSub] = useState<SubmissionRecord | null>(null);
  
  const [comments, setComments] = useState<Record<string, SubmissionComment[]>>(teacherStore.submissionComments);
  const [newComment, setNewComment] = useState('');

  const filteredSubmissions = useMemo(() => {
    if (filter === 'all') return submissions;
    return submissions.filter(s => s.status === filter);
  }, [submissions, filter]);

  const handleOpenDetail = (sub: SubmissionRecord) => {
    setSelectedSub(sub);
    if (sub.unreadFeedbackCount > 0) {
      setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, unreadFeedbackCount: 0 } : s));
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedSub) return;

    const comment: SubmissionComment = {
      id: `c_${Date.now()}`,
      at: 'Agora mesmo',
      author: { id: 'prof_1', name: 'Ricardo Silveira', role: 'TEACHER' },
      body: newComment
    };

    setComments(prev => ({
      ...prev,
      [selectedSub.id]: [...(prev[selectedSub.id] || []), comment]
    }));

    setSubmissions(prev => prev.map(s => s.id === selectedSub.id ? { ...s, lastUpdateAt: 'Agora mesmo' } : s));
    setNewComment('');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved': return { label: 'Aprovado', color: 'bg-emerald-500/10 text-emerald-500', icon: 'check_circle' };
      case 'returned': return { label: 'Devolvido', color: 'bg-destructive/10 text-destructive', icon: 'assignment_return' };
      case 'review': return { label: 'Em Análise', color: 'bg-amber-500/10 text-amber-500', icon: 'hourglass_top' };
      case 'sent': return { label: 'Enviado', color: 'bg-blue-500/10 text-blue-500', icon: 'send' };
      default: return { label: 'Rascunho', color: 'bg-muted text-muted-foreground', icon: 'edit' };
    }
  };

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-foreground">Envios para Aprovação</h1>
        <p className="text-muted-foreground font-medium mt-1">Fila central de documentos e lançamentos aguardando revisão pedagógica.</p>
      </div>

      {/* FILTERS */}
      <div className="flex border-b border-border mb-10 overflow-x-auto gap-8">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'approved', label: 'Aprovados' },
          { id: 'returned', label: 'Devolvidos' },
          { id: 'review', label: 'Em análise' },
          { id: 'draft', label: 'Rascunhos' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              filter === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUBMISSIONS LIST */}
      <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Documento / Lançamento</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Data do Envio</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Status Atual</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-right">Gerenciar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSubmissions.length > 0 ? filteredSubmissions.map((sub) => {
                const config = getStatusConfig(sub.status);
                return (
                  <tr key={sub.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`size-10 rounded-xl ${config.color} flex items-center justify-center shrink-0`}>
                          <span className="material-symbols-outlined text-xl">{config.icon}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                             <p className="text-sm font-black text-foreground truncate">{sub.title}</p>
                             {sub.unreadFeedbackCount > 0 && <span className="size-2 bg-destructive rounded-full animate-pulse"></span>}
                          </div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Ref: {sub.ref} {sub.classLabel ? `• ${sub.classLabel}` : ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-muted-foreground">{sub.sentAt || sub.createdAt}</td>
                    <td className="px-8 py-6">
                       <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${config.color}`}>
                          {config.label}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleOpenDetail(sub)}
                            className="size-10 rounded-xl bg-muted text-muted-foreground hover:text-primary transition-all flex items-center justify-center relative"
                            title="Ver Detalhes"
                          >
                             <span className="material-symbols-outlined text-[22px]">visibility</span>
                             {(comments[sub.id]?.length > 0 || sub.returnedFeedback) && (
                               <span className="absolute -top-1 -right-1 size-4 bg-primary text-primary-foreground text-[8px] font-black rounded-full flex items-center justify-center border-2 border-card">
                                 {comments[sub.id]?.length || 1}
                               </span>
                             )}
                          </button>
                          {sub.status === 'returned' && (
                             <button 
                               onClick={() => navigate(sub.type === 'notas' ? `/professor/notas?submission=${sub.id}` : `/professor/avaliacoes`)}
                               className="size-10 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center"
                               title="Corrigir"
                             >
                                <span className="material-symbols-outlined text-[22px]">edit_square</span>
                             </button>
                          )}
                       </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                   <td colSpan={4} className="p-20 text-center text-muted-foreground opacity-40">Nenhum envio nesta categoria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL DRAWER - CORRECTED FOR GLOBAL THEME SYSTEM */}
      {selectedSub && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSub(null)}></div>
          <div className="relative w-full max-w-xl bg-card h-full shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300 flex flex-col border-l border-border">
            {/* Header */}
            <div className="p-8 border-b border-border flex items-center justify-between shrink-0 bg-muted/20">
               <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-[18px] ${getStatusConfig(selectedSub.status).color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-2xl">{getStatusConfig(selectedSub.status).icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-card-foreground">{selectedSub.title}</h3>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{getStatusConfig(selectedSub.status).label} • Ref: {selectedSub.ref}</p>
                  </div>
               </div>
               <button onClick={() => setSelectedSub(null)} className="size-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-10">
               {/* Metadata Grid - SEMANTIC TOKENS USED HERE */}
               <div className="grid grid-cols-2 gap-4 bg-muted/40 p-8 rounded-3xl border border-border">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Turma</p>
                    <p className="text-xs font-black text-foreground uppercase">{selectedSub.classLabel || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Enviado em</p>
                    <p className="text-xs font-black text-foreground">{selectedSub.sentAt || 'Aguardando'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Última Atualização</p>
                    <p className="text-xs font-black text-foreground">{selectedSub.lastUpdateAt}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Protocolo</p>
                    <p className="text-xs font-black text-primary hover:underline cursor-pointer">#{selectedSub.id}</p>
                  </div>
               </div>

               {/* Returned Feedback Section */}
               {selectedSub.status === 'returned' && selectedSub.returnedFeedback && (
                 <div className="space-y-6">
                    <div className="flex items-center gap-2 text-destructive">
                       <span className="material-symbols-outlined text-lg font-black">assignment_return</span>
                       <h4 className="text-xs font-black uppercase tracking-widest">Motivo da Devolução</h4>
                    </div>
                    <div className="p-6 bg-destructive/5 border border-destructive/20 rounded-3xl border-l-4 border-destructive">
                       <p className="text-sm font-medium text-foreground mb-4 leading-relaxed italic">
                         "{selectedSub.returnedFeedback.reason}"
                       </p>
                       <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Alterações Necessárias:</p>
                          <ul className="space-y-2">
                             {selectedSub.returnedFeedback.requestedChanges.map((change, i) => (
                               <li key={i} className="flex gap-2 text-xs font-bold text-muted-foreground">
                                  <span className="text-destructive font-black">•</span>
                                  {change}
                               </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                 </div>
               )}

               {/* History Timeline */}
               <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">history</span> Histórico
                  </h4>
                  <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-border">
                     {(teacherStore.submissionEvents[selectedSub.id] || []).map((ev) => (
                       <div key={ev.id} className="relative pl-10">
                          <div className="absolute left-0 top-1.5 size-6 rounded-full bg-muted border-4 border-card flex items-center justify-center">
                             <span className="material-symbols-outlined text-[10px] font-black text-muted-foreground">
                                {ev.actorRole === 'COORD' ? 'verified' : 'person'}
                             </span>
                          </div>
                          <div className="flex justify-between items-start">
                             <div>
                                <p className="text-xs font-black text-foreground">{ev.action}</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">{ev.actorName} ({ev.actorRole})</p>
                             </div>
                             <span className="text-[9px] font-black text-muted-foreground uppercase">{ev.at}</span>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Comment Thread */}
               <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">chat</span> Mensagens
                  </h4>
                  <div className="space-y-6">
                     {(comments[selectedSub.id] || []).map((c) => {
                       const isMe = c.author.role === 'TEACHER';
                       return (
                         <div key={c.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                               <div className={`px-4 py-3 rounded-2xl text-xs font-medium ${
                                 isMe ? 'bg-primary text-primary-foreground rounded-tr-none shadow-lg shadow-primary/10' : 'bg-muted text-foreground rounded-tl-none border border-border'
                               }`}>
                                 {c.body}
                               </div>
                               <span className="px-1 text-[9px] font-black text-muted-foreground uppercase">{c.at} • {c.author.name}</span>
                            </div>
                         </div>
                       );
                     })}
                  </div>
               </div>
            </div>

            {/* Sticky Comment Footer */}
            <div className="p-8 border-t border-border bg-card shrink-0">
               <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    placeholder="Escreva sua mensagem..."
                    className="flex-1 bg-muted border border-border rounded-2xl py-3.5 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
                  />
                  <button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="size-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined">send</span>
                  </button>
               </div>
               {selectedSub.status === 'returned' && (
                 <div className="mt-6">
                    <button 
                      onClick={() => navigate(selectedSub.type === 'notas' ? `/professor/notas?submission=${selectedSub.id}` : `/professor/avaliacoes`)}
                      className="w-full py-4 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">edit_square</span>
                      Corrigir e Re-enviar Agora
                    </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfessorEnvios;
