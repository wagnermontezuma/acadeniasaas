
import React from 'react';
import Layout from '../components/Layout.tsx';
import { UserRole } from '../types.ts';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout role={UserRole.STUDENT}>
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Resumo Acadêmico</h2>
        <p className="text-slate-500 font-medium">Bem-vindo de volta, Lucas. Aqui está o seu desempenho atual.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Disciplinas', value: '8', trend: '+0%', icon: 'library_books' },
              { label: 'Avaliações', value: '12', trend: '+2', icon: 'assignment_turned_in' },
              { label: 'Frequência %', value: '94%', trend: '+1%', icon: 'analytics' }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined">{stat.icon}</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 text-[10px] font-black">{stat.trend}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Featured Bulletin Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="p-10 flex-1 space-y-6">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-[10px] font-black rounded-full uppercase">Destaque</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full uppercase">• Publicado</span>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Boletim do Período</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Suas notas finais do 2º Semestre 2023 já estão disponíveis para consulta e download.</p>
              </div>
              <button 
                onClick={() => navigate('/student/report-card')}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">description</span>
                Ver Boletim
              </button>
            </div>
            <div className="w-full md:w-1/3 bg-slate-50 dark:bg-white/2 p-10 flex items-center justify-center relative">
               <div className="bg-white dark:bg-slate-800 size-32 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-primary text-4xl">fact_check</span>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter text-center">STATUS: 100% FINALIZADO</p>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-8">
          {/* Avisos */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">campaign</span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Avisos</h3>
              </div>
              <button className="text-[10px] font-bold text-primary uppercase hover:underline">Ver todos</button>
            </div>
            <div className="space-y-6">
              {[
                { date: '15 NOV, 2023', title: 'Início da Rematrícula 2024', desc: 'O prazo para renovação de matrícula inicia na...' },
                { date: '12 NOV, 2023', title: 'Feira de Ciências e Tecnologia', desc: 'Confira o cronograma de apresentações por...' },
                { date: '10 NOV, 2023', title: 'Horário de Atendimento Biblioteca', desc: 'Houve alteração no horário de funcionamento...' }
              ].map((aviso, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[9px] font-black text-primary uppercase tracking-widest">{aviso.date}</p>
                  <h4 className="text-sm font-bold leading-tight">{aviso.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{aviso.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mensagens Quick View */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">forum</span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Mensagens</h3>
              </div>
              <span className="bg-cyan-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg">2 Novas</span>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Profª Maria Silva', msg: 'Dúvida sobre o trabalho de Cálculo', time: '14:20', img: 'https://i.pravatar.cc/100?img=47', online: true },
                { name: 'Coord. João Santos', msg: 'Confirmação de participação no eve...', time: 'Ontem', img: 'https://i.pravatar.cc/100?img=12', online: true },
                { name: 'Ana Clara (Colega)', msg: 'Você já terminou o resumo?', time: '08 Nov', img: 'https://i.pravatar.cc/100?img=25', online: false }
              ].map((item, i) => (
                <button key={i} onClick={() => navigate('/messages')} className="w-full flex items-center gap-3 group text-left">
                  <div className="relative shrink-0">
                    <img src={item.img} className="size-10 rounded-full grayscale group-hover:grayscale-0 transition-all border border-slate-100 dark:border-slate-800" alt="" />
                    {item.online && <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h4 className="text-[11px] font-black truncate">{item.name}</h4>
                      <span className="text-[9px] text-slate-400 font-bold">{item.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{item.msg}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Support Card for Student */}
      <div className="fixed bottom-8 left-8 w-60 z-10 pointer-events-none">
        <div className="bg-cyan-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-cyan-100 dark:border-slate-800 shadow-xl pointer-events-auto space-y-4">
          <div>
            <h5 className="text-[9px] font-black uppercase text-primary tracking-widest mb-1">Suporte Acadêmico</h5>
            <p className="text-[10px] font-medium text-slate-500 leading-tight">Precisa de ajuda com sua matrícula?</p>
          </div>
          <button className="w-full py-2.5 bg-primary text-white text-xs font-black rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Falar com Tutor
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
