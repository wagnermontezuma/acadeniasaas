
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';

const BOPlanos: React.FC = () => {
  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Planos e Precificação</h1>
          <p className="text-slate-500 font-medium mt-1">Configure o catálogo global de produtos e regras de billing.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
          <span className="material-symbols-outlined text-xl">add_card</span>
          Criar Novo Plano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {backofficeMocks.plans.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col group hover:border-primary/40 transition-all min-h-[460px]">
            <div className="p-8 pb-4">
               <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${plan.isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-400/10 text-slate-400'}`}>
                    {plan.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                  <div className="flex gap-2">
                    <button className="size-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-base">edit</span></button>
                    <button className="size-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-amber-500 transition-colors"><span className="material-symbols-outlined text-base">content_copy</span></button>
                  </div>
               </div>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{plan.name}</h3>
               <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-black">R$ {plan.priceMonthly}</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">/mês base</span>
               </div>
            </div>
            
            <div className="px-8 flex-1 space-y-6">
               <div className="space-y-1.5">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em]">Limites e Métricas</p>
                  <div className="flex items-center gap-2">
                     <span className="material-symbols-outlined text-primary text-lg">group</span>
                     <p className="text-sm font-black">{plan.studentLimit === 99999 ? 'Matrículas Ilimitadas' : `${plan.studentLimit.toLocaleString()} Alunos`}</p>
                  </div>
                  {plan.pricePerStudent > 0 && (
                     <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-cyan-500 text-lg">person_add_alt</span>
                        <p className="text-xs font-bold text-slate-500">R$ {plan.pricePerStudent} por aluno extra</p>
                     </div>
                  )}
               </div>
               <div className="pt-6 border-t border-slate-50 dark:border-white/5">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em] mb-3">Principais Features</p>
                  <ul className="space-y-2.5">
                     {plan.features.slice(0, 4).map((f, i) => (
                       <li key={i} className="flex items-start gap-2.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5">check_circle</span>
                          <span className="leading-tight">{f}</span>
                       </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="p-6">
               <button className="w-full py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:border-primary/30 transition-all">Configurações Avançadas</button>
            </div>
          </div>
        ))}
        
        {/* Placeholder para Novo Plano */}
        <div className="border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[32px] flex flex-col items-center justify-center p-10 text-center group cursor-pointer hover:border-primary/40 transition-all min-h-[460px]">
           <div className="size-16 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all mb-4">
              <span className="material-symbols-outlined text-4xl">add</span>
           </div>
           <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest group-hover:text-primary">Novo Plano</h4>
        </div>
      </div>
    </Layout>
  );
};

export default BOPlanos;
