
import React from 'react';
import Layout from '../components/Layout';
import { UserRole } from '../types';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ label: string; value: string; icon: string; trend?: string; trendDown?: boolean }> = ({ label, value, icon, trend, trendDown }) => (
  <div className="bg-white dark:bg-[#1a2b2b] p-6 rounded-xl shadow-sm border border-[#dce5e5] dark:border-white/5 transition-transform hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[#638788] text-sm font-semibold uppercase tracking-wider">{label}</p>
      <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">{icon}</span>
    </div>
    <div className="flex items-end gap-2">
      <h3 className="text-3xl font-bold leading-none">{value}</h3>
      {trend && (
        <span className={`${trendDown ? 'text-red-500' : 'text-green-600'} text-sm font-bold flex items-center mb-0.5`}>
          <span className="material-symbols-outlined text-[16px]">{trendDown ? 'trending_down' : 'trending_up'}</span> {trend}
        </span>
      )}
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#111718] dark:text-white tracking-tight">Dashboard</h1>
        <p className="text-[#638788] mt-1 font-medium">Bem-vindo de volta ao painel de controle do Colégio Alfa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Usuários Ativos" value="1.240" icon="person" trend="5%" />
        <StatCard label="Turmas Totais" value="42" icon="class" trend="2%" trendDown />
        <StatCard label="Status do Plano" value="Premium" icon="stars" />
        <StatCard label="Pendências" value="12" icon="checklist" trend="Atenção" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#1a2b2b] rounded-xl border border-[#dce5e5] dark:border-white/5 shadow-sm flex flex-col h-fit overflow-hidden">
            <div className="p-6 border-b border-[#f0f4f4] dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
              <h2 className="text-lg font-bold">Checklist de Configuração</h2>
              <button className="text-primary text-sm font-bold hover:underline">Ver tudo</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#f6f8f8] dark:bg-white/5 text-[#638788] text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 font-bold">Tarefa</th>
                    <th className="px-6 py-3 font-bold">Responsável</th>
                    <th className="px-6 py-3 font-bold">Prazo</th>
                    <th className="px-6 py-3 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f4f4] dark:divide-white/5">
                  <tr className="hover:bg-[#f6f8f8]/50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold">Importar Dados de Alunos</p>
                      <p className="text-xs text-[#638788]">240 registros pendentes</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">JS</div>
                        <span className="text-sm font-medium">João S.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">12 Out</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">Pendente</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#f6f8f8]/50 dark:hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold">Definir Calendário</p>
                      <p className="text-xs text-[#638788]">Feriados e bimestres</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">AR</div>
                        <span className="text-sm font-medium">Ana R.</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">15 Out</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-800 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">Concluído</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* New Section demonstrating Direct Image Links */}
          <div className="bg-white dark:bg-[#1a2b2b] p-6 rounded-xl border border-[#dce5e5] dark:border-white/5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Parceiros Institucionais</h2>
            <div className="flex flex-wrap items-center gap-8 opacity-60">
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 grayscale hover:grayscale-0 transition-all"/>
              </a>
              <a href="https://microsoft.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-6 grayscale hover:grayscale-0 transition-all"/>
              </a>
              <a href="https://apple.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-6 dark:invert grayscale hover:grayscale-0 transition-all"/>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1a2b2b] rounded-xl border border-[#dce5e5] dark:border-white/5 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/users" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-primary/10 transition-colors border border-gray-100 dark:border-white/5">
                <span className="material-symbols-outlined text-primary">person_add</span>
                <span className="text-xs font-bold text-center">Novo Usuário</span>
              </Link>
              <Link to="/academic-structure" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-primary/10 transition-colors border border-gray-100 dark:border-white/5">
                <span className="material-symbols-outlined text-primary">account_tree</span>
                <span className="text-xs font-bold text-center">Estrutura</span>
              </Link>
              <Link to="/allocations" className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-primary/10 transition-colors border border-gray-100 dark:border-white/5">
                <span className="material-symbols-outlined text-primary">event_available</span>
                <span className="text-xs font-bold text-center">Alocações</span>
              </Link>
              <button className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-primary/10 transition-colors border border-gray-100 dark:border-white/5">
                <span className="material-symbols-outlined text-primary">campaign</span>
                <span className="text-xs font-bold text-center">Aviso Geral</span>
              </button>
            </div>
          </div>
          
          <div className="bg-primary p-6 rounded-xl text-white shadow-lg shadow-primary/20 relative overflow-hidden">
            <h3 className="font-bold text-lg mb-2 relative z-10">Suporte Premium</h3>
            <p className="text-white/80 text-sm mb-4 relative z-10">Fale com um consultor pedagógico agora mesmo.</p>
            <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-bold relative z-10 hover:bg-opacity-90 transition-all">Chat Direto</button>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl text-white/10 rotate-12">support_agent</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
