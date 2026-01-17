
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';
import { Link } from 'react-router-dom';

const BODashboard: React.FC = () => {
  const stats = [
    { label: 'Escolas Ativas', value: backofficeMocks.schools.filter(s => s.status === 'Ativa').length, total: backofficeMocks.schools.length, icon: 'corporate_fare', color: 'text-primary' },
    { label: 'Alunos Totais', value: backofficeMocks.schools.reduce((acc, s) => acc + s.activeStudents, 0).toLocaleString(), icon: 'group', color: 'text-emerald-500' },
    { label: 'MRR Estimado', value: 'R$ 42.850', trend: '+12.5%', icon: 'payments', color: 'text-cyan-500' },
    { label: 'Tickets Abertos', value: backofficeMocks.tickets.length, icon: 'confirmation_number', color: 'text-amber-500' },
  ];

  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Visão Global do Ecossistema</h1>
        <p className="text-slate-500 font-medium">Controle de métricas operacionais e financeiras da plataforma AcademiaSaaS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-[#1a2b2b] p-6 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-sm group hover:scale-[1.02] transition-transform">
            <div className="flex justify-between items-start mb-4">
              <div className={`size-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center ${s.color}`}>
                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
              </div>
              {s.trend && <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">{s.trend}</span>}
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black">{s.value}</h3>
              {s.total && <span className="text-xs text-slate-400 font-bold">/ {s.total}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/30 dark:bg-white/1">
              <h3 className="text-sm font-black uppercase tracking-widest">Escolas Recentemente Ativadas</h3>
              <Link to="/backoffice/escolas" className="text-[10px] font-black text-primary uppercase hover:underline tracking-widest">Gerenciar Todas</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 dark:bg-white/2">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Escola</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Plano</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Alunos</th>
                    <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {backofficeMocks.schools.slice(0, 4).map((school) => (
                    <tr key={school.id} className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors">
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold">{school.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{school.domain}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-2 py-0.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase">{school.planId.split('_')[1]}</span>
                      </td>
                      <td className="px-8 py-5 text-sm font-black">{school.activeStudents}</td>
                      <td className="px-8 py-5 text-right">
                        <Link to={`/backoffice/escolas/${school.id}`} className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-primary/10 text-slate-400 hover:text-primary transition-all">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50/50 dark:bg-white/2 border-t border-slate-100 dark:border-white/5 text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Última atualização: Hoje, às 14:00</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1a2b2b] p-8 rounded-[32px] border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">Logs Críticos</h3>
            <div className="space-y-6">
              {backofficeMocks.auditLogs.map((log) => (
                <div key={log.id} className="flex gap-4 group">
                  <div className={`size-2 rounded-full mt-1.5 shrink-0 ${log.severity === 'Alta' ? 'bg-red-500 animate-pulse' : 'bg-primary'}`}></div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black leading-tight uppercase group-hover:text-primary transition-colors">{log.action}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1 truncate">{log.actor} • {log.at}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/backoffice/auditoria" className="w-full mt-8 py-3.5 bg-slate-50 dark:bg-white/5 rounded-2xl text-[10px] font-black uppercase text-center block hover:bg-primary hover:text-white transition-all shadow-sm">Logs Completos</Link>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-cyan-500/10 p-8 rounded-[32px] border border-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-black text-primary text-xs uppercase tracking-widest mb-2">Gateways de Pagamento</h4>
              <div className="flex items-center gap-3">
                 <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
                 <p className="text-xl font-black">Asaas API Online</p>
              </div>
              <p className="text-[10px] text-slate-400 font-bold mt-4">Webhooks processados: 1.242/hoje</p>
            </div>
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-8xl text-primary/10 rotate-12 group-hover:rotate-0 transition-transform">api</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BODashboard;
