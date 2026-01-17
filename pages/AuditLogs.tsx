
import React from 'react';
import Layout from '../components/Layout';
import { UserRole, AuditLog } from '../types';

const logs: AuditLog[] = [
  { time: "24/05/2023 14:30", user: "Carlos Silva", module: "Notas", action: "EDITAR", desc: "Alteração de nota do aluno João Costa" },
  { time: "24/05/2023 12:15", user: "Ana Souza", module: "Plano", action: "CRIAR", desc: "Novo plano de aula cadastrado" },
  { time: "23/05/2023 18:45", user: "Roberto Lima", module: "Usuários", action: "EXCLUIR", desc: "Remoção de acesso temporário" }
];

const AuditLogs: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Auditoria e Logs</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Rastreie todas as ações críticas em tempo real.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all">
          <span className="material-symbols-outlined text-[18px]">download</span> Exportar CSV
        </button>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Data/Hora</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Usuário</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Módulo</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Ação</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">{log.time}</td>
                  <td className="px-6 py-4 text-sm font-bold">{log.user}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold">{log.module}</span></td>
                  <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">{log.action}</span></td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{log.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AuditLogs;
