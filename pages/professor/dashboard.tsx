
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { Link, useNavigate } from 'react-router-dom';
import { teacherMocks, Submission, NextAction } from '../../data/teacherMocks.ts';

const ProfessorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const stats = [
    { label: "Turmas Ativas", value: teacherMocks.classes.length.toString().padStart(2, '0'), icon: "groups", path: "/professor/turmas", trend: "Ver todas" },
    { label: "Avaliações", value: "12", icon: "assignment", path: "/professor/avaliacoes", trend: "8 Pendentes", urgent: true },
    { label: "Notas para Lançar", value: "45", icon: "edit_note", path: "/professor/notas", trend: "Bimestre 2" },
    { label: "Itens Devolvidos", value: teacherMocks.submissions.filter(s => s.status === 'returned').length.toString().padStart(2, '0'), icon: "assignment_return", path: "/professor/envios", trend: "Revisar", urgent: true },
  ];

  const handleActionClick = (action: NextAction) => {
    switch (action.type) {
      case 'grade':
        navigate(`/professor/notas?turma=${action.classId}&avaliacao=${action.evaluationId}`);
        break;
      case 'prepare':
        navigate(`/professor/turmas/${action.classId}`);
        break;
      case 'report':
        navigate('/professor/envios');
        break;
      default:
        break;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-emerald-500 bg-emerald-500/10';
      case 'returned': return 'text-destructive bg-destructive/10';
      case 'review': return 'text-amber-500 bg-amber-500/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-foreground tracking-tight">Painel Docente</h1>
        <p className="text-muted-foreground mt-1 font-medium">Bem-vindo, Prof. Ricardo Silveira. Aqui está o resumo das suas atividades.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <Link 
            key={i} 
            to={stat.path}
            className="bg-card p-6 rounded-3xl shadow-sm border border-border transition-all hover:shadow-xl hover:border-primary/40 group flex flex-col justify-between min-h-[160px]"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-foreground leading-none">{stat.value}</h3>
              </div>
              <span className={`material-symbols-outlined ${stat.urgent ? 'text-destructive bg-destructive/10' : 'text-primary bg-primary/10'} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>{stat.icon}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${stat.urgent ? 'text-destructive' : 'text-primary'}`}>{stat.trend}</span>
              <span className="material-symbols-outlined text-muted-foreground text-sm group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card rounded-[40px] border border-border shadow-sm overflow-hidden h-full">
            <div className="p-8 border-b border-border flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary font-black">bolt</span>
                <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Ações Prioritárias</h2>
              </div>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-black rounded-lg uppercase tracking-tighter">Fila de Trabalho</span>
            </div>
            <div className="p-4 space-y-2">
              {teacherMocks.nextActions.map((action) => (
                <button 
                  key={action.id} 
                  onClick={() => handleActionClick(action)}
                  className="w-full flex items-center justify-between p-6 rounded-[28px] hover:bg-muted transition-all group border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-6 text-left">
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm">
                      <span className="material-symbols-outlined text-2xl">
                        {action.type === 'grade' ? 'edit_note' : action.type === 'prepare' ? 'auto_stories' : 'description'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors">{action.title}</h4>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-tighter mt-0.5">{action.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div className="hidden sm:block">
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-0.5">Prazo Estimado</p>
                      <p className="text-xs font-black text-foreground">{action.dueLabel}</p>
                    </div>
                    <span className="material-symbols-outlined text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-card p-8 rounded-[40px] border border-border shadow-sm flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Workflow de Envios</h3>
                <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
              </div>
              <div className="space-y-6 flex-1">
                {teacherMocks.submissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between group">
                    <div className="min-w-0">
                      <p className="text-sm font-black truncate text-foreground group-hover:text-primary transition-colors">{submission.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${getStatusColor(submission.status)}`}>
                          {submission.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">• {submission.lastUpdateAt}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedSubmission(submission)}
                      className="size-10 rounded-xl bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-center shrink-0"
                      title="Visualizar Detalhes"
                    >
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                ))}
              </div>
              <Link 
                to="/professor/envios" 
                className="w-full mt-10 py-4 bg-muted rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-center block hover:bg-primary hover:text-primary-foreground transition-all shadow-sm text-foreground"
              >
                Gerenciar Todos os Envios
              </Link>
           </div>
        </div>
      </div>

      {/* Submission Detail Overlay (Drawer) */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-[100] flex justify-end">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSubmission(null)}></div>
           <div className="relative w-full max-w-md bg-card h-full shadow-2xl p-10 animate-in slide-in-from-right duration-300 flex flex-col border-l border-border">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-foreground">Detalhe do Envio</h3>
                <button onClick={() => setSelectedSubmission(null)} className="size-12 rounded-2xl hover:bg-muted flex items-center justify-center text-muted-foreground">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-8 flex-1">
                 <div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Documento / Lançamento</span>
                    <h4 className="text-xl font-black text-foreground mt-1">{selectedSubmission.title}</h4>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                       <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Status Atual</p>
                       <p className={`text-xs font-black uppercase ${selectedSubmission.status === 'approved' ? 'text-emerald-500' : selectedSubmission.status === 'returned' ? 'text-destructive' : 'text-amber-500'}`}>
                          {selectedSubmission.status}
                       </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border">
                       <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Última Atualização</p>
                       <p className="text-xs font-black text-foreground">{selectedSubmission.lastUpdateAt}</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Feedback da Coordenação</p>
                    <div className="p-6 bg-muted/40 rounded-3xl border-l-4 border-primary border border-border">
                       <p className="text-sm font-medium text-foreground leading-relaxed italic">
                          "{selectedSubmission.feedback || 'Aguardando revisão da coordenação pedagógica.'}"
                       </p>
                    </div>
                 </div>
              </div>

              <div className="pt-10 space-y-3">
                 {selectedSubmission.status === 'returned' && (
                    <button 
                      onClick={() => navigate(`/professor/notas?turma=${selectedSubmission.classId}`)}
                      className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                    >
                       <span className="material-symbols-outlined">edit_square</span>
                       Corrigir e Re-enviar
                    </button>
                 )}
                 <button 
                  onClick={() => setSelectedSubmission(null)}
                  className="w-full py-4 text-xs font-black uppercase text-muted-foreground hover:text-foreground"
                 >
                    Fechar Detalhes
                 </button>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfessorDashboard;
