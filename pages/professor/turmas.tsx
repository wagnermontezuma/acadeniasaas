
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { Link } from 'react-router-dom';
import { teacherStore } from '../../data/teacherMocks.ts';

const ProfessorTurmas: React.FC = () => {
  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Minhas Turmas</h1>
          <p className="text-slate-500 font-medium mt-1">Visualize e gerencie suas alocações acadêmicas para o período vigente.</p>
        </div>
        <div className="relative w-full md:w-64 group">
           <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
           <input 
            type="text" 
            placeholder="Buscar turma..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
           />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {teacherStore.classes.map((turma) => (
          <div key={turma.id} className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className={`h-24 ${turma.color} p-6 flex items-end justify-between relative shrink-0`}>
               <span className="text-[10px] font-black text-white/50 uppercase tracking-widest relative z-10">{turma.periodLabel}</span>
               <span className="material-symbols-outlined text-white/20 text-7xl absolute -right-4 -top-4 rotate-12 group-hover:rotate-0 transition-transform">school</span>
            </div>
            <div className="p-8 flex-1 flex flex-col">
               <div className="mb-6 flex-1">
                 <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors leading-tight">{turma.name}</h3>
                 <p className="text-sm font-bold text-slate-500">{turma.subject} • {turma.shift}</p>
               </div>
               
               <div className="flex items-center gap-6 pt-6 border-t border-slate-50 dark:border-white/5">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Alunos</p>
                     <p className="text-sm font-black">{turma.studentsCount}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Status</p>
                     <p className={`text-[10px] font-black uppercase ${turma.status === 'Concluída' ? 'text-slate-400' : 'text-emerald-500'}`}>{turma.status}</p>
                  </div>
               </div>
               
               <Link 
                to={`/professor/turmas/${turma.id}`}
                className="w-full mt-8 py-3.5 bg-slate-50 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
               >
                  Acessar Detalhes
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
               </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProfessorTurmas;
