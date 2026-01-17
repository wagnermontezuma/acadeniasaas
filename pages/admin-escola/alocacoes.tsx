
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const AlocacoesPage: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Alocações</h1>
          <p className="text-slate-500 font-medium mt-1">Gestão de vínculos entre professores, turmas e disciplinas.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Visualizar por Professor</button>
           <button className="px-4 py-2 text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary">Visualizar por Turma</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: '9º Ano A - Matutino', icon: 'groups', count: '32 Alunos', prof: 'Ricardo Lopes', disc: 'Matemática' },
          { name: '1º Ensino Médio B', icon: 'groups', count: '28 Alunos', prof: 'Ana Clara', disc: 'Física' },
          { name: '2º Ensino Médio A', icon: 'groups', count: '45 Alunos', prof: 'Marcos V.', disc: 'História' },
        ].map((turma, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">{turma.icon}</span>
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{turma.name}</h3>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{turma.count}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400">Professor Responsável</span>
                <span className="text-xs font-bold">{turma.prof}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400">Disciplina Principal</span>
                <span className="text-xs font-bold text-primary">{turma.disc}</span>
              </div>
            </div>

            <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              Editar Alocação
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AlocacoesPage;
