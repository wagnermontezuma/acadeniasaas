
import React from 'react';
import Layout from '../components/Layout';
import { UserRole } from '../types';

const CoordinationDashboard: React.FC = () => {
  return (
    <Layout role={UserRole.COORDINATION}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-[#121617] dark:text-white">Aprovações</h2>
          <p className="text-[#667f85] dark:text-gray-400 mt-1">Fila de lançamentos aguardando revisão da coordenação.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-sm font-bold text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-[20px]">done_all</span>
            Aprovar Selecionados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1a1d23] p-6 rounded-xl border border-[#dce1e5] dark:border-zinc-800 shadow-sm flex items-center gap-4 border-l-4 border-amber-400">
          <div className="size-12 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined text-3xl">pending_actions</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#657886]">Itens na Fila</p>
            <p className="text-2xl font-black">14</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a1d23] p-6 rounded-xl border border-[#dce1e5] dark:border-zinc-800 shadow-sm flex items-center gap-4 border-l-4 border-green-500">
          <div className="size-12 rounded-lg bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600">
            <span className="material-symbols-outlined text-3xl">task_alt</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#657886]">Aprovados Hoje</p>
            <p className="text-2xl font-black">32</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a1d23] p-6 rounded-xl border border-[#dce1e5] dark:border-zinc-800 shadow-sm flex items-center gap-4 border-l-4 border-primary">
          <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl">groups</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#657886]">Professores Ativos</p>
            <p className="text-2xl font-black">88</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Solicitante</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Item</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { prof: "Dr. Ricardo Lopes", item: "Notas P1 - Matemática (9º A)", status: "Em aprovação", color: "amber" },
              { prof: "Profa. Ana Clara", item: "Plano de Aula - Física (1º EM)", status: "Revisão", color: "red" },
              { prof: "Prof. Marcos V.", item: "Relatório Mensal - História", status: "Pendente", color: "amber" }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{row.prof[0]}</div>
                    <span className="text-sm font-bold">{row.prof}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">{row.item}</td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-lg ${row.color === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'} text-[10px] font-bold uppercase`}>{row.status}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all">REVISAR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CoordinationDashboard;
