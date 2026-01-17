
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const ProfessorAvaliacoes: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const avaliacoes = [
    { id: '1', title: 'Prova Bimestral 1 (P1)', type: 'Prova', turma: '9º Ano A', date: '15/05/2024', status: 'Fechada', results: '28/32' },
    { id: '2', title: 'Trabalho de Geometria', type: 'Trabalho', turma: '9º Ano A', date: '22/05/2024', status: 'Aberta', results: '15/32' },
    { id: '3', title: 'Simulado Global', type: 'Simulado', turma: 'Todos 9º Anos', date: '01/06/2024', status: 'Agendada', results: '0/120' },
  ];

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Avaliações</h1>
          <p className="text-slate-500 font-medium mt-1">Gerencie os instrumentos de avaliação da sua disciplina.</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Criar Avaliação</span>
        </button>
      </div>

      {/* Task B: Evaluation Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-5 mb-8 flex flex-wrap gap-4 items-end">
        <div className="w-48 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Período Letivo</label>
          <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20">
            <option>2024.1</option>
            <option>2023.2</option>
          </select>
        </div>
        <div className="w-64 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Turma</label>
          <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20">
            <option>Todas as Turmas</option>
            <option>9º Ano A</option>
            <option>1º EM B</option>
          </select>
        </div>
        <button className="h-10 px-4 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-xl hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[20px]">filter_list</span>
        </button>
      </div>

      <div className="space-y-4">
        {avaliacoes.map((av) => (
          <div key={av.id} className="bg-white dark:bg-[#1a2b2b] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm hover:border-primary/30 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined font-black">assignment</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{av.title}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{av.type} • {av.turma}</span>
                  <span className="size-1 bg-slate-200 dark:bg-white/10 rounded-full"></span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Aplicação: {av.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
               <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lançamentos</p>
                  <p className="text-xs font-black">{av.results}</p>
               </div>
               <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                 av.status === 'Aberta' ? 'bg-emerald-500/10 text-emerald-500' : 
                 av.status === 'Fechada' ? 'bg-slate-500/10 text-slate-500' : 
                 'bg-amber-500/10 text-amber-500'
               }`}>
                 {av.status}
               </span>
               <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-primary transition-all" title="Ver Detalhes">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                {av.status !== 'Fechada' && (
                  <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-primary transition-all" title="Editar">
                      <span className="material-symbols-outlined text-[20px]">edit_square</span>
                  </button>
                )}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Creation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1a2b2b] h-full shadow-2xl p-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black">Nova Avaliação</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome da Avaliação</label>
                <input type="text" placeholder="Ex: Prova Semestral P1" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tipo</label>
                    <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold">
                       <option>Prova</option>
                       <option>Trabalho</option>
                       <option>Simulado</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Data</label>
                    <input type="date" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold" />
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Turma Destino</label>
                <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold">
                   <option>9º Ano A - Matutino</option>
                   <option>1º EM B - Vespertino</option>
                </select>
              </div>
              <div className="pt-10">
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-primary/20">Configurar e Publicar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfessorAvaliacoes;
