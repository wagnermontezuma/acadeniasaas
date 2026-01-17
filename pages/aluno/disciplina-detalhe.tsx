
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { studentMocks } from '../../data/studentMocks.ts';

const AlunoDisciplinaDetalhe: React.FC = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'mural' | 'atividades' | 'notas' | 'materiais'>('mural');
  
  const subject = studentMocks.subjects.find(s => s.id === subjectId);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['mural', 'atividades', 'notas', 'materiais'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  if (!subject) {
    return <Layout role={UserRole.STUDENT}><div className="p-20 text-center">Disciplina não encontrada.</div></Layout>;
  }

  const subjectAnnouncements = studentMocks.announcements.filter(a => a.subjectId === subjectId);
  const subjectActivities = (studentMocks.activities as any)[subjectId || ''] || [];
  const subjectGrades = (studentMocks.grades as any)[subjectId || ''] || [];
  const subjectMaterials = (studentMocks.materials as any)[subjectId || ''] || [];

  return (
    <Layout role={UserRole.STUDENT}>
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
          <button onClick={() => navigate('/aluno/disciplinas')} className="hover:text-primary transition-colors">Minhas Disciplinas</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-white">{subject.name}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={`size-16 rounded-[24px] ${subject.color} text-white flex items-center justify-center shrink-0 shadow-xl`}>
              <span className="material-symbols-outlined text-4xl">{subject.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{subject.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">{subject.code}</span>
                <span className="size-1 bg-slate-300 rounded-full"></span>
                <span className="text-sm font-bold text-primary italic">{subject.teacher}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button onClick={() => navigate('/aluno/boletim')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                <span className="material-symbols-outlined text-xl">description</span>
                Ver Boletim
             </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 dark:border-white/5 mb-10 overflow-x-auto gap-10">
        {[
          { id: 'mural', label: 'Mural', icon: 'campaign' },
          { id: 'atividades', label: 'Atividades', icon: 'assignment' },
          { id: 'notas', label: 'Notas Publicadas', icon: 'grade' },
          { id: 'materiais', label: 'Materiais', icon: 'folder_open' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {/* MURAL */}
        {activeTab === 'mural' && (
          <div className="grid gap-6 animate-in fade-in duration-300">
            {subjectAnnouncements.length > 0 ? (
              subjectAnnouncements.map(ann => (
                <div key={ann.id} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                   <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">{ann.date}</p>
                   </div>
                   <h4 className="text-xl font-black mb-3">{ann.title}</h4>
                   <p className="text-slate-500 leading-relaxed mb-6">{ann.body}</p>
                   <button className="text-xs font-black text-slate-400 uppercase hover:text-primary transition-colors">Marcar como lido</button>
                </div>
              ))
            ) : (
              <div className="py-20 flex flex-col items-center opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">notifications_off</span>
                <p className="font-black uppercase tracking-widest">Sem avisos nesta disciplina</p>
              </div>
            )}
          </div>
        )}

        {/* ATIVIDADES */}
        {activeTab === 'atividades' && (
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 dark:bg-white/2">
                  <tr className="border-b border-slate-100 dark:border-white/5">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Atividade</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prazo / Aplicação</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Peso</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {subjectActivities.map((act: any) => (
                    <tr key={act.id} className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors">
                      <td className="px-8 py-6 font-bold text-sm text-slate-900 dark:text-white">{act.title}</td>
                      <td className="px-8 py-6 text-xs text-slate-500">{act.type}</td>
                      <td className="px-8 py-6 text-xs text-slate-500">{act.date}</td>
                      <td className="px-8 py-6 text-center text-xs font-black text-primary">{act.weight}</td>
                      <td className="px-8 py-6 text-right">
                        <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                          act.status === 'Finalizada' ? 'bg-emerald-500/10 text-emerald-500' : 
                          act.status === 'Pendente' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {act.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* NOTAS */}
        {activeTab === 'notas' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-primary/5 p-10 rounded-[40px] border border-primary/20 flex items-center justify-between">
               <div className="flex items-center gap-8">
                  <div className="size-20 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                     <span className="text-3xl font-black">{subject.grade}</span>
                  </div>
                  <div>
                     <h4 className="text-xl font-black uppercase tracking-widest">Média Parcial</h4>
                     <p className="text-slate-500 font-medium">Sua nota atual baseada nas avaliações publicadas.</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">FREQUÊNCIA</p>
                  <p className="text-3xl font-black">{subject.attendance}%</p>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-slate-50/50 dark:bg-white/2">
                     <tr className="border-b border-slate-100 dark:border-white/5">
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Avaliação</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Nota</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                       <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Feedback do Professor</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                     {subjectGrades.map((g: any) => (
                       <tr key={g.id} className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors">
                         <td className="px-8 py-6 font-bold text-sm">{g.title}</td>
                         <td className="px-8 py-6 text-center">
                            <div className={`size-10 rounded-xl mx-auto flex items-center justify-center font-black text-sm ${g.status === 'Publicado' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-300'}`}>
                               {g.grade}
                            </div>
                         </td>
                         <td className="px-8 py-6 text-center">
                            <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${g.status === 'Publicado' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                               {g.status}
                            </span>
                         </td>
                         <td className="px-8 py-6 text-xs text-slate-500 italic">"{g.obs}"</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {/* MATERIAIS */}
        {activeTab === 'materiais' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {subjectMaterials.length > 0 ? (
              subjectMaterials.map((mat: any) => (
                <button key={mat.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center gap-6 hover:border-primary/40 hover:shadow-lg transition-all text-left group">
                   <div className="size-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-3xl">{mat.type === 'PDF' ? 'picture_as_pdf' : 'link'}</span>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-black truncate text-slate-900 dark:text-white">{mat.name}</h5>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{mat.type} • Postado em {mat.date}</p>
                   </div>
                   <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors">download</span>
                </button>
              ))
            ) : (
              <div className="col-span-2 py-20 flex flex-col items-center opacity-40">
                <span className="material-symbols-outlined text-6xl mb-4">folder_off</span>
                <p className="font-black uppercase tracking-widest">Sem materiais disponíveis</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AlunoDisciplinaDetalhe;
