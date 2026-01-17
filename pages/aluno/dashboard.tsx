
import React, { useState, useMemo } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { useNavigate, Link } from 'react-router-dom';
import { studentMocks } from '../../data/studentMocks.ts';
import { messageMocks } from '../../data/student/messages.ts';

const AlunoDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof studentMocks.announcements[0] | null>(null);
  const [announcements, setAnnouncements] = useState(studentMocks.announcements);

  const markAsRead = (id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
    setSelectedAnnouncement(null);
  };

  const unreadAnnouncementsCount = announcements.filter(a => !a.read).length;
  const unreadMessagesCount = useMemo(() => messageMocks.threads.reduce((acc, t) => acc + t.unreadCount, 0), []);
  const recentThreads = useMemo(() => messageMocks.threads.slice(0, 2), []);

  return (
    <Layout role={UserRole.STUDENT}>
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Resumo Acadêmico</h2>
        <p className="text-slate-500 font-medium">Olá, Lucas Silva. Acompanhe seu desempenho e as novidades da escola.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/aluno/disciplinas" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/40 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">library_books</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Disciplinas</p>
                <h3 className="text-3xl font-black">{studentMocks.subjects.length.toString().padStart(2, '0')}</h3>
            </Link>
            
            <Link to="/aluno/disciplinas?tab=atividades" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-black">+2 Novas</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Atividades</p>
                <h3 className="text-3xl font-black">12</h3>
            </Link>

            <Link to="/aluno/boletim" className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:border-cyan-500/40 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">analytics</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-200 group-hover:text-cyan-500 transition-colors">trending_up</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Média Geral</p>
                <h3 className="text-3xl font-black">8.2</h3>
            </Link>
          </div>

          {/* Featured Bulletin Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all border-l-8 border-l-primary">
            <div className="p-12 flex-1 space-y-6">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-[10px] font-black rounded-full uppercase tracking-widest">Oficial</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest">Publicado</span>
              </div>
              <div>
                <h3 className="text-3xl font-black mb-2">Boletim Consolidado 2023.2</h3>
                <p className="text-slate-500 text-base leading-relaxed font-medium">Suas notas e frequência finais do último período letivo foram homologadas pela coordenação e já estão disponíveis para consulta oficial.</p>
              </div>
              <button 
                onClick={() => navigate('/aluno/boletim')}
                className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined">description</span>
                Acessar Boletim Completo
              </button>
            </div>
            <div className="w-full md:w-1/3 bg-slate-50 dark:bg-white/2 p-12 flex items-center justify-center">
               <div className="bg-white dark:bg-slate-800 size-40 rounded-[40px] shadow-2xl flex flex-col items-center justify-center gap-3 border border-slate-100 dark:border-white/5">
                  <span className="material-symbols-outlined text-primary text-5xl">fact_check</span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">TUDO EM DIA</p>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-8">
          {/* Avisos */}
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">campaign</span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Avisos</h3>
              </div>
              {unreadAnnouncementsCount > 0 && (
                <span className="size-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full">{unreadAnnouncementsCount}</span>
              )}
            </div>
            <div className="space-y-6">
              {announcements.slice(0, 3).map((aviso) => (
                <button 
                  key={aviso.id} 
                  onClick={() => setSelectedAnnouncement(aviso)}
                  className={`w-full text-left space-y-1.5 group relative ${aviso.read ? 'opacity-50' : ''}`}
                >
                  {!aviso.read && <div className="absolute -left-3 top-1 size-1.5 bg-primary rounded-full"></div>}
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center justify-between">
                    {aviso.date}
                    {aviso.importance === 'Alta' && <span className="text-red-500">• URGENTE</span>}
                  </p>
                  <h4 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{aviso.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{aviso.body}</p>
                </button>
              ))}
            </div>
            <button 
              onClick={() => navigate('/aluno/comunicacao')}
              className="w-full mt-8 py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all"
            >
              Ver Central de Avisos
            </button>
          </div>

          {/* Mensagens Quick View - INTEGRATED */}
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
              <Link to="/aluno/comunicacao?tab=mensagens" className="flex items-center gap-2 group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">forum</span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest group-hover:text-primary transition-colors">Mensagens</h3>
              </Link>
              {unreadMessagesCount > 0 && (
                <span className="bg-cyan-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg">{unreadMessagesCount} Novas</span>
              )}
            </div>
            <div className="space-y-5">
              {recentThreads.map((thread) => {
                const other = thread.participants[0];
                return (
                  <Link 
                    key={thread.id} 
                    to={`/aluno/comunicacao?tab=mensagens&thread=${thread.id}`} 
                    className="flex items-center gap-4 group"
                  >
                    <img src={other.avatarUrl} className="size-10 rounded-full grayscale group-hover:grayscale-0 transition-all border-2 border-transparent group-hover:border-primary/20" alt="" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="text-[11px] font-black truncate text-slate-900 dark:text-white group-hover:text-primary transition-colors">{other.name}</h4>
                        <span className="text-[9px] text-slate-400 font-bold">{thread.lastMessageAt}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate leading-tight">{thread.preview}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <button 
              onClick={() => navigate('/aluno/comunicacao?tab=mensagens')}
              className="w-full mt-6 py-2.5 bg-slate-50 dark:bg-white/5 rounded-xl text-[9px] font-black uppercase text-slate-400 hover:text-primary transition-all"
            >
              Ver Todas as Conversas
            </button>
          </div>
        </div>
      </div>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
           <div className="bg-white dark:bg-[#1a2b2b] rounded-[40px] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-white/5">
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${selectedAnnouncement.importance === 'Alta' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                      Importância {selectedAnnouncement.importance}
                    </span>
                    <h3 className="text-2xl font-black mt-3 leading-tight">{selectedAnnouncement.title}</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Publicado em: {selectedAnnouncement.date}</p>
                 </div>
                 <button onClick={() => setSelectedAnnouncement(null)} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center text-slate-400">
                   <span className="material-symbols-outlined">close</span>
                 </button>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                 <p className="text-slate-500 dark:text-slate-300 leading-relaxed">
                   {selectedAnnouncement.body}
                 </p>
              </div>
              <div className="mt-12 flex gap-4">
                 <button 
                  onClick={() => setSelectedAnnouncement(null)}
                  className="flex-1 py-4 text-xs font-black uppercase text-slate-400 hover:text-slate-600"
                 >
                   Fechar
                 </button>
                 {!selectedAnnouncement.read && (
                    <button 
                      onClick={() => markAsRead(selectedAnnouncement.id)}
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                    >
                      Marcar como Lido
                    </button>
                 )}
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default AlunoDashboard;
