
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ label: string; value: string; icon: string; trend?: string; trendDown?: boolean }> = ({ label, value, icon, trend, trendDown }) => (
  <div className="bg-white dark:bg-[#1a2b2b] p-6 rounded-2xl shadow-sm border border-[#dce5e5] dark:border-white/5 transition-all hover:shadow-md group">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[#638788] text-[10px] font-black uppercase tracking-widest">{label}</p>
      <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform">{icon}</span>
    </div>
    <div className="flex items-end gap-2">
      <h3 className="text-3xl font-black leading-none">{value}</h3>
      {trend && (
        <span className={`${trendDown ? 'text-red-500' : 'text-emerald-500'} text-xs font-bold flex items-center mb-0.5 bg-slate-50 dark:bg-white/5 px-1.5 py-0.5 rounded-lg`}>
          <span className="material-symbols-outlined text-[14px] mr-0.5">{trendDown ? 'trending_down' : 'trending_up'}</span> {trend}
        </span>
      )}
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#111718] dark:text-white tracking-tight">Visão Geral</h1>
        <p className="text-[#638788] mt-1 font-medium">Gestão centralizada da Unidade Centro • Matriz</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Usuários Ativos" value="1.240" icon="group" trend="5%" />
        <StatCard label="Turmas Ativas" value="42" icon="school" trend="2%" trendDown />
        <StatCard label="Taxa de Adimplência" value="94.2%" icon="account_balance_wallet" trend="1.5%" />
        <StatCard label="Alertas de Sistema" value="03" icon="error" trend="Crítico" trendDown />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#1a2b2b] rounded-3xl border border-[#dce5e5] dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#f0f4f4] dark:border-white/5 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#111718] dark:text-white">Últimas Atividades de Auditoria</h2>
              <Link to="/admin-escola/auditoria" className="text-primary text-xs font-bold hover:underline">Ver log completo</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f6f8f8] dark:bg-white/5 text-[#638788] text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Evento</th>
                    <th className="px-6 py-4">Usuário</th>
                    <th className="px-6 py-4">Data/Hora</th>
                    <th className="px-6 py-4 text-right">Módulo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f4f4] dark:divide-white/5">
                  <tr className="hover:bg-[#f6f8f8]/50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold">Alteração de Permissões</td>
                    <td className="px-6 py-4 text-sm">João Silva (Admin)</td>
                    <td className="px-6 py-4 text-sm text-[#638788]">Hoje, 14:20</td>
                    <td className="px-6 py-4 text-right"><span className="px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-[10px] font-bold">USUÁRIOS</span></td>
                  </tr>
                  <tr className="hover:bg-[#f6f8f8]/50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold">Nova Turma Criada</td>
                    <td className="px-6 py-4 text-sm">Ana Costa (Coord)</td>
                    <td className="px-6 py-4 text-sm text-[#638788]">Hoje, 11:05</td>
                    <td className="px-6 py-4 text-right"><span className="px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-[10px] font-bold">ESTRUTURA</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-3xl border border-primary/20 relative overflow-hidden group">
            <h3 className="font-black text-xl mb-2 relative z-10">Status do Plano</h3>
            <p className="text-[#638788] text-sm mb-6 relative z-10 leading-relaxed">Você está utilizando o plano <strong>Premium Enterprise</strong>.</p>
            <Link to="/admin-escola/plano-assinatura" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-bold relative z-10 hover:opacity-90 transition-all">
              Gerenciar Plano
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-primary/10 rotate-12 group-hover:rotate-0 transition-transform">workspace_premium</span>
          </div>

          <div className="bg-white dark:bg-[#1a2b2b] p-6 rounded-3xl border border-[#dce5e5] dark:border-white/10 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin-escola/usuarios" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-primary/10 transition-colors group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">person_add</span>
                <span className="text-[10px] font-black uppercase text-center">Novo Usuário</span>
              </Link>
              <Link to="/admin-escola/comunicados" className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-primary/10 transition-colors group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">campaign</span>
                <span className="text-[10px] font-black uppercase text-center">Comunicado</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
