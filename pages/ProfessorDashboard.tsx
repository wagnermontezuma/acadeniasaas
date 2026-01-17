
import React from 'react';
import Layout from '../components/Layout';
import { UserRole } from '../types';

const ProfessorDashboard: React.FC = () => {
  return (
    <Layout role={UserRole.PROFESSOR}>
      <h1 className="text-3xl font-bold mb-6">Bom dia, Prof. Ricardo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl border border-[#dce5e5] dark:border-[#2a3f3f] shadow-sm flex flex-col gap-2">
          <span className="text-[#638788] text-sm font-semibold uppercase tracking-wide">Turmas Ativas</span>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-bold">8</p>
            <p className="text-primary text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">trending_up</span> Estável
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl border border-[#dce5e5] dark:border-[#2a3f3f] shadow-sm flex flex-col gap-2">
          <span className="text-[#638788] text-sm font-semibold uppercase tracking-wide">Avaliações no Mês</span>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-bold">12</p>
            <p className="text-primary text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">trending_up</span> +5%
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a2e2e] p-6 rounded-2xl border border-[#dce5e5] dark:border-[#2a3f3f] shadow-sm flex flex-col gap-2">
          <span className="text-[#638788] text-sm font-semibold uppercase tracking-wide">Notas Pendentes</span>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-bold">45</p>
            <p className="text-red-500 text-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">trending_down</span> -10%
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Atalhos do Professor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="p-6 bg-primary text-white rounded-xl font-bold flex flex-col gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
              <span className="material-symbols-outlined text-3xl">add_task</span>
              Criar Avaliação
            </button>
            <button className="p-6 bg-white dark:bg-gray-800 border border-primary/20 rounded-xl font-bold flex flex-col gap-3 shadow-sm hover:scale-[1.02] transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary">edit_note</span>
              Lançar Notas
            </button>
          </div>
        </div>
        <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 border-l-4 border-primary shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">event</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">Próxima Aula</h3>
              <p className="text-xs text-[#638788]">Começa em 25 minutos</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold">Física Aplicada II</p>
            <p className="text-sm font-medium text-[#638788]">Sala 402, Bloco C</p>
          </div>
          <hr className="my-4 border-primary/10"/>
          <button className="flex items-center gap-2 text-primary font-bold text-sm group">
            Ver Cronograma Completo
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessorDashboard;
