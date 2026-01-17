
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const MinhasTurmas: React.FC = () => {
  const turmas = [
    { id: '1', name: '9º Ano A - Matutino', discipline: 'Matemática', students: 32, period: '2024.1', color: 'bg-blue-500' },
    { id: '2', name: '1º Ensino Médio B', discipline: 'Física', students: 28, period: '2024.1', color: 'bg-emerald-500' },
    { id: '3', name: '2º Ensino Médio A', discipline: 'Matemática Avançada', students: 45, period: '2024.1', color: 'bg-purple-500' },
    { id: '4', name: '3º Ensino Médio B', discipline: 'Física Quântica', students: 22, period: '2024.1', color: 'bg-rose-500' },
  ];

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Minhas Turmas</h1>
          <p className="text-slate-500 font-medium mt-1">Selecione uma turma para gerenciar alunos e avaliações.</p>
        </div>
        <div className="relative w-full md:w-64">
           <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
           <input type="text" placeholder="Buscar turma..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {turmas.map((turma) => (
          <div key={turma.id} className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer">
            <div className={`h-24 ${turma.color} p-6 flex items-end justify-between relative`}>
               <span className="text-[10px] font-black text-white/50 uppercase tracking-widest relative z-10">{turma.period}</span>
               <span className="material-symbols-outlined text-white/20 text-7xl absolute -right-4 -top-4 rotate-12 group-hover:rotate-0 transition-transform">school</span>
            </div>
            <div className="p-8">
               <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">{turma.name}</h3>
               <p className="text-sm font-bold text-slate-500 mb-6">{turma.discipline}</p>
               
               <div className="flex items-center gap-6 pt-6 border-t border-slate-50 dark:border-white/5">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase text-slate-400">Alunos</p>
                     <p className="text-sm font-black">{turma.students}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase text-slate-400">Média Turma</p>
                     <p className="text-sm font-black text-primary">8.2</p>
                  </div>
               </div>
               
               <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                  Acessar Turma
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default MinhasTurmas;
