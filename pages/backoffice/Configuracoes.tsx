
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const BOConfiguracoes: React.FC = () => {
  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Configurações Globais</h1>
        <p className="text-slate-500 font-medium mt-1">Variáveis de sistema, limites padrão e feature flags.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[32px] border border-slate-200 dark:border-slate-800 space-y-10">
               <div>
                  <h3 className="text-lg font-black mb-6">Variáveis de Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">SLA Padrão (Horas)</label>
                        <input type="number" defaultValue="24" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-black"/>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Período de Trial (Dias)</label>
                        <input type="number" defaultValue="14" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-black"/>
                     </div>
                  </div>
               </div>

               <div className="pt-10 border-t border-slate-100 dark:border-white/5">
                  <h3 className="text-lg font-black mb-6">Feature Flags</h3>
                  <div className="space-y-4">
                     {[
                       { id: '1', label: 'Nova Dashboard Aluno v2', desc: 'Ativa a interface experimental para todos os alunos.', enabled: true },
                       { id: '2', label: 'IA Report Generation', desc: 'Habilita o conector OpenAI para geração de relatórios pedagógicos.', enabled: false },
                       { id: '3', label: 'Manutenção Global', desc: 'Coloca toda a plataforma em modo leitura (exceto BackOffice).', enabled: false },
                     ].map((ff) => (
                       <div key={ff.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-white/2 rounded-2xl border border-slate-100 dark:border-white/5">
                          <div className="max-w-md">
                             <p className="text-sm font-black">{ff.label}</p>
                             <p className="text-xs text-slate-400 font-medium mt-1">{ff.desc}</p>
                          </div>
                          <div className={`size-10 rounded-full flex items-center justify-center transition-all ${ff.enabled ? 'bg-primary/20 text-primary' : 'bg-slate-200 dark:bg-white/5 text-slate-400'}`}>
                             <div className={`size-5 rounded-full ${ff.enabled ? 'bg-primary' : 'bg-slate-400'}`}></div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm">
               <h3 className="text-sm font-black uppercase tracking-widest mb-6">Versão do Sistema</h3>
               <div className="flex items-center gap-4">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined font-black">deployed_code</span>
                  </div>
                  <div>
                    <p className="text-lg font-black">v1.0.42-stable</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Build: #49921</p>
                  </div>
               </div>
               <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all">Ver Release Notes</button>
            </div>
         </div>
      </div>
    </Layout>
  );
};

export default BOConfiguracoes;
