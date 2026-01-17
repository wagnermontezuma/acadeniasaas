
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole, AuditLog } from '../../types.ts';

const logs: AuditLog[] = [
  { time: "24/05/2023 14:30", user: "Carlos Silva", module: "Notas", action: "EDITAR", desc: "Alteração de nota do aluno João Costa" },
  { time: "24/05/2023 12:15", user: "Ana Souza", module: "Plano", action: "CRIAR", desc: "Novo plano de aula cadastrado" },
  { time: "23/05/2023 18:45", user: "Roberto Lima", module: "Usuários", action: "EXCLUIR", desc: "Remoção de acesso temporário" },
  { time: "23/05/2023 10:20", user: "João Silva", module: "Estrutura", action: "EDITAR", desc: "Configuração de novo período letivo" },
];

const AuditoriaPage: React.FC = () => {
  // Task A: States for filters and status
  const [viewState, setViewState] = useState<'data' | 'loading' | 'empty' | '403'>('data');

  if (viewState === '403') {
    return (
      <Layout role={UserRole.ADMIN}>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
          <div className="size-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-5xl text-red-500">lock_person</span>
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">Acesso Negado</h2>
          <p className="text-[#638788] font-medium max-w-md">Você não possui permissões suficientes para visualizar os registros de auditoria desta unidade.</p>
          <button onClick={() => setViewState('data')} className="mt-8 text-primary font-black uppercase text-xs tracking-widest hover:underline">Solicitar Acesso</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role={UserRole.ADMIN}>
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Registro de Auditoria</h2>
          <p className="text-slate-500 font-medium mt-1">Rastreabilidade completa de ações críticas (Somente Leitura).</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span> 
          <span>Exportar PDF</span>
        </button>
      </header>

      {/* Task A: Robust Filter Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[24px] p-6 mb-8 flex flex-wrap gap-5 items-end shadow-sm">
        <div className="flex-1 min-w-[240px] space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Usuário Responsável</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">person_search</span>
            <input type="text" placeholder="Nome ou e-mail..." className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 pl-10 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all"/>
          </div>
        </div>
        <div className="w-48 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Módulo do Sistema</label>
          <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20">
            <option>Todos os Módulos</option>
            <option>Usuários e Acessos</option>
            <option>Notas e Boletins</option>
            <option>Estrutura Acadêmica</option>
            <option>Plano de Assinatura</option>
          </select>
        </div>
        <div className="w-48 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Tipo de Ação</label>
          <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20">
            <option>Todas as Ações</option>
            <option>Criação</option>
            <option>Edição</option>
            <option>Exclusão</option>
            <option>Acesso/Login</option>
          </select>
        </div>
        <div className="w-56 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Intervalo de Data</label>
          <div className="grid grid-cols-2 gap-2">
            <input type="date" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-2 text-xs font-bold"/>
            <input type="date" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-2 text-xs font-bold"/>
          </div>
        </div>
        <button onClick={() => setViewState('loading')} className="size-12 bg-slate-50 dark:bg-white/5 flex items-center justify-center rounded-xl hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-primary">refresh</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {viewState === 'loading' ? (
          <div className="p-20 flex flex-col items-center justify-center">
             <div className="size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
             <p className="text-xs font-black uppercase tracking-widest text-slate-400">Processando registros...</p>
             <button onClick={() => setViewState('empty')} className="mt-4 text-[10px] text-slate-300">Simular Vazio</button>
          </div>
        ) : viewState === 'empty' ? (
          <div className="p-20 text-center flex flex-col items-center">
             <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-white/10 mb-4">data_info_alert</span>
             <h3 className="text-lg font-black">Nenhum registro encontrado</h3>
             <p className="text-slate-500 text-sm mt-1">Refine seus filtros para encontrar ações específicas.</p>
             <button onClick={() => setViewState('data')} className="mt-6 text-primary font-bold text-xs">Limpar todos os filtros</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Data/Hora</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Usuário</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Módulo</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Tipo de Ação</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Descrição detalhada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                {logs.map((log, i) => (
                  <tr key={i} className="group transition-colors">
                    <td className="px-8 py-6 text-xs font-bold text-slate-500 whitespace-nowrap">{log.time}</td>
                    <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white">{log.user}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-[9px] font-black uppercase text-slate-600 dark:text-slate-400 tracking-tight">
                        {log.module}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        log.action === 'EXCLUIR' ? 'bg-red-500/10 text-red-500' : 
                        log.action === 'CRIAR' ? 'bg-blue-500/10 text-blue-500' : 
                        'bg-amber-500/10 text-amber-600'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs font-medium text-slate-500 dark:text-slate-400 max-w-sm">
                      {log.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button onClick={() => setViewState('403')} className="text-[10px] font-black uppercase text-slate-300 hover:text-red-400">Simular 403</button>
      </div>
    </Layout>
  );
};

export default AuditoriaPage;
