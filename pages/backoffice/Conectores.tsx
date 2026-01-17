
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';

const BOConectores: React.FC = () => {
  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Conectores e Gateways</h1>
        <p className="text-slate-500 font-medium mt-1">Gestão de integrações financeiras e endpoints de webhook.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {backofficeMocks.gateways.map((gt) => (
          <div key={gt.id} className="bg-white dark:bg-slate-900 p-10 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full group">
            <div className="flex justify-between items-start mb-8">
               <div className="size-14 rounded-[20px] bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-4xl">payments</span>
               </div>
               <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${gt.enabled ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-400/10 text-slate-400'}`}>
                    {gt.enabled ? 'Habilitado' : 'Pausado'}
                  </span>
                  <button className="material-symbols-outlined text-slate-300 hover:text-primary">settings</button>
               </div>
            </div>
            
            <h3 className="text-xl font-black mb-1">{gt.name}</h3>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-8">{gt.mode}</p>

            <div className="space-y-6 flex-1">
               <div className="p-4 bg-slate-50 dark:bg-white/2 rounded-2xl border border-slate-100 dark:border-white/5">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Webhook URL</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] font-bold truncate text-slate-500">{gt.webhookUrl}</p>
                    <button className="material-symbols-outlined text-sm text-slate-400 hover:text-primary">content_copy</button>
                  </div>
               </div>
               <div className="p-4 bg-slate-50 dark:bg-white/2 rounded-2xl border border-slate-100 dark:border-white/5">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Public Key</p>
                  <p className="text-xs font-black tracking-widest">{gt.maskedKey}</p>
               </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Última atualização: {gt.updatedAt}</p>
               <button className="px-6 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20">Testar Conexão</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default BOConectores;
