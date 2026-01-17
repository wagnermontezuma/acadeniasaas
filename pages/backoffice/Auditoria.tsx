
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';

const BOAuditoria: React.FC = () => {
  const [severityFilter, setSeverityFilter] = useState('Todas');
  const [isExporting, setIsExporting] = useState(false);

  const filteredLogs = severityFilter === 'Todas' 
    ? backofficeMocks.auditLogs 
    : backofficeMocks.auditLogs.filter(l => l.severity === severityFilter);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8,ID,Ator,Acao,Severidade,Data\n" + 
        filteredLogs.map(l => `${l.id},${l.actor},${l.action},${l.severity},${l.at}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "auditoria_global_academiasaas.csv");
      document.body.appendChild(link);
      link.click();
      setIsExporting(false);
    }, 1500);
  };

  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Auditoria Global</h1>
          <p className="text-slate-500 font-medium mt-1">Rastreabilidade completa de ações administrativas e alterações de sistema.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1a2b2b] border border-slate-200 dark:border-white/10 text-sm font-black rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm"
        >
          {isExporting ? (
            <div className="size-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          ) : (
            <span className="material-symbols-outlined text-xl">file_download</span>
          )}
          {isExporting ? 'Processando...' : 'Exportar Logs (.csv)'}
        </button>
      </div>

      <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-wrap gap-6 items-center justify-between">
           <div className="flex gap-4">
              {['Todas', 'Alta', 'Média', 'Baixa'].map(sev => (
                <button 
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${severityFilter === sev ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 dark:bg-white/5 text-slate-400'}`}
                >
                  {sev === 'Todas' ? 'Todas Severidades' : sev}
                </button>
              ))}
           </div>
           <div className="relative w-full max-w-xs">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input type="text" placeholder="Filtrar por ator ou ação..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400" />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-white/2">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Timestamp</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Responsável</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Ação / Evento</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Contexto</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Severidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors group">
                  <td className="px-8 py-6 text-xs font-bold text-slate-500">{log.at}</td>
                  <td className="px-8 py-6 text-sm font-black">{log.actor}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-primary">{log.action}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{log.metadata?.school || 'Ação Global'}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg text-slate-400 tracking-tighter">{log.scope}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${log.severity === 'Alta' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                       {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-slate-50/50 dark:bg-white/2 flex justify-between items-center px-10 border-t border-slate-100 dark:border-white/5">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Exibindo {filteredLogs.length} logs de auditoria</p>
          <div className="flex gap-2">
            <button className="size-9 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 opacity-50 cursor-not-allowed">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="size-9 rounded-xl bg-primary text-white font-black text-xs">1</button>
            <button className="size-9 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BOAuditoria;
