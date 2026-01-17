
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';
import { Link } from 'react-router-dom';

const BOPagamentos: React.FC = () => {
  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Transações e Receitas</h1>
        <p className="text-slate-500 font-medium mt-1">Histórico financeiro global e conciliação.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Volume 30 Dias</p>
            <h3 className="text-3xl font-black">R$ 145.200</h3>
         </div>
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Churnt Rate</p>
            <h3 className="text-3xl font-black text-red-500">2.1%</h3>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
           <h3 className="text-sm font-black uppercase tracking-widest">Fluxo de Caixa (Mock)</h3>
           <button className="flex items-center gap-2 text-primary font-black text-xs uppercase hover:underline">
              <span className="material-symbols-outlined text-sm">download</span> Exportar Relatório
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-white/2">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Escola</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-center">Data</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Gateway</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {backofficeMocks.payments.map((p) => {
                const school = backofficeMocks.schools.find(s => s.id === p.schoolId);
                return (
                  <tr key={p.id} className="hover:bg-slate-50/30 dark:hover:bg-white/2 transition-colors cursor-pointer" onClick={() => {}}>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900 dark:text-white">{school?.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{p.invoiceId}</p>
                    </td>
                    <td className="px-8 py-6 text-center text-xs font-bold text-slate-500">{p.createdAt}</td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{p.gateway}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                          p.status === 'Aprovado' ? 'bg-emerald-500/10 text-emerald-500' : 
                          p.status === 'Recusado' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-slate-900 dark:text-white">
                      R$ {p.amount.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default BOPagamentos;
