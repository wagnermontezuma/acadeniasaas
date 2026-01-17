
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';

const BOSuporte: React.FC = () => {
  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Central de Suporte</h1>
        <p className="text-slate-500 font-medium mt-1">Gestão de chamados técnicos e comerciais de tenants.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {backofficeMocks.tickets.map((tk) => {
          const school = backofficeMocks.schools.find(s => s.id === tk.schoolId);
          return (
            <div key={tk.id} className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-200 dark:border-slate-800 shadow-sm group hover:border-primary/20 transition-all">
               <div className="flex justify-between items-start mb-6">
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${tk.priority === 'Alta' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'}`}>Prioridade {tk.priority}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase">{tk.updatedAt}</span>
               </div>
               <h4 className="text-lg font-black mb-2 group-hover:text-primary transition-colors">{tk.subject}</h4>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Escola: {school?.name}</p>
               
               <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-white/5">
                  <div className="flex items-center gap-3">
                     <div className="size-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm text-slate-400">person</span>
                     </div>
                     <span className="text-xs font-bold text-slate-500">{tk.assignedTo}</span>
                  </div>
                  <span className="text-[10px] font-black text-cyan-500 uppercase">{tk.status}</span>
               </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default BOSuporte;
