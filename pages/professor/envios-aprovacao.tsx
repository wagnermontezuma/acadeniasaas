
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const EnviosAprovacao: React.FC = () => {
  const envios = [
    { id: '1', title: 'Notas P1 - Matemática (9º A)', date: '24/05/2023', status: 'Aprovado', color: 'bg-emerald-500', feedback: 'Tudo ok.' },
    { id: '2', title: 'Notas T1 - Física (1º EM)', date: '23/05/2023', status: 'Devolvido', color: 'bg-red-500', feedback: 'Faltam notas de 2 alunos ausentes.' },
    { id: '3', title: 'Plano de Aula - 2º Semestre', date: '22/05/2023', status: 'Em análise', color: 'bg-amber-500', feedback: '-' },
    { id: '4', title: 'Relatório Mensal de Desempenho', date: '20/05/2023', status: 'Rascunho', color: 'bg-slate-400', feedback: '-' },
  ];

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Envios para Aprovação</h1>
        <p className="text-slate-500 font-medium mt-1">Acompanhe o status dos itens enviados para revisão da coordenação.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Item / Documento</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Data do Envio</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Feedback Coordenação</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              {envios.map((envio) => (
                <tr key={envio.id} className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{envio.title}</p>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-500">{envio.date}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`size-2 rounded-full ${envio.color}`}></div>
                       <span className="text-[10px] font-black uppercase tracking-widest">{envio.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-medium text-slate-400 italic">"{envio.feedback}"</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="size-9 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-primary transition-all">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                       </button>
                       {envio.status === 'Devolvido' && (
                         <button className="size-9 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                            <span className="material-symbols-outlined text-lg">edit</span>
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-20 text-center py-8 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs font-bold text-slate-400">© 2024 AcademiaSaaS • Área do Docente</p>
      </footer>
    </Layout>
  );
};

export default EnviosAprovacao;
