
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const ProfessorComunicacao: React.FC = () => {
  const comunicados = [
    { id: '1', title: 'Reunião de Pais e Mestres - 2º Bimestre', target: 'Pais, Alunos', date: '25/05/2024', status: 'Ativo' },
    { id: '2', title: 'Alteração no Cronograma de Provas', target: 'Professores, Alunos', date: '22/05/2024', status: 'Ativo' },
    { id: '3', title: 'Manutenção do Laboratório de Química', target: 'Professores', date: '15/05/2024', status: 'Expirado' },
  ];

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Comunicados e Avisos</h1>
        <p className="text-slate-500 font-medium mt-1">Fique por dentro das atualizações institucionais e pedagógicas.</p>
      </div>

      <div className="space-y-4">
        {comunicados.map((com) => (
          <div key={com.id} className="bg-white dark:bg-[#1a2b2b] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm hover:border-primary/30 transition-all flex items-center justify-between group">
            <div className="flex items-center gap-6">
              <div className={`size-12 rounded-2xl flex items-center justify-center ${com.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                <span className="material-symbols-outlined font-black">campaign</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{com.title}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Público: {com.target}</span>
                  <span className="size-1 bg-slate-200 dark:bg-white/10 rounded-full"></span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Publicado em: {com.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${com.status === 'Ativo' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                {com.status}
              </span>
              <button className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-primary transition-all flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-primary/5 dark:bg-white/2 rounded-[32px] border border-dashed border-primary/20 flex flex-col items-center text-center">
         <span className="material-symbols-outlined text-4xl text-primary/40 mb-4">info</span>
         <p className="text-sm font-bold text-slate-500 max-w-sm">Você está visualizando comunicados institucionais. Para criar novos avisos para suas turmas, utilize a aba "Minhas Turmas".</p>
      </div>
    </Layout>
  );
};

export default ProfessorComunicacao;
