
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';
import { Link } from 'react-router-dom';

const BOAssinaturas: React.FC = () => {
  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Assinaturas e Contratos</h1>
        <p className="text-slate-500 font-medium mt-1">Visão financeira individual por tenant.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-white/2">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Escola</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Plano</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Status Assinatura</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Próx. Vencimento</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-right">Valor Mensal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {backofficeMocks.schools.map((school) => {
                const plan = backofficeMocks.plans.find(p => p.id === school.planId);
                return (
                  <tr key={school.id} className="hover:bg-slate-50/30 dark:hover:bg-white/2 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-900 dark:text-white">{school.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{school.id}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-black uppercase tracking-widest">{plan?.name}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                         <div className={`size-1.5 rounded-full ${school.status === 'Ativa' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                         <span className="text-[10px] font-black uppercase tracking-widest">{school.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-500 italic">15 de Junho, 2024</td>
                    <td className="px-8 py-6 text-right font-black text-slate-900 dark:text-white">
                      R$ {plan?.priceMonthly.toLocaleString()}
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

export default BOAssinaturas;
