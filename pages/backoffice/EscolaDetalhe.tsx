
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';

const BOEscolaDetalhe: React.FC = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const school = backofficeMocks.schools.find(s => s.id === schoolId);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'billing' | 'logs'>('overview');

  if (!school) {
    return <Layout role={UserRole.BACKOFFICE}><div className="p-20 text-center">Escola não encontrada. <Link to="/backoffice/escolas" className="text-primary underline">Voltar</Link></div></Layout>;
  }

  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
          <Link to="/backoffice/escolas" className="hover:text-primary">Escolas</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-white">Gerenciamento de Instância</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="size-16 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-4xl">corporate_fare</span>
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{school.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">{school.domain}</span>
                <span className="size-1 bg-slate-300 rounded-full"></span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${school.status === 'Ativa' ? 'text-emerald-500' : 'text-red-500'}`}>• {school.status}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                <span className="material-symbols-outlined text-xl">login</span>
                Impersonar Admin
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:opacity-90 transition-all">
                <span className="material-symbols-outlined text-xl">block</span>
                Suspender
             </button>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-white/5 mb-10 overflow-x-auto gap-10">
        {[
          { id: 'overview', label: 'Visão Geral', icon: 'info' },
          { id: 'users', label: 'Usuários Admin', icon: 'manage_accounts' },
          { id: 'billing', label: 'Assinatura', icon: 'credit_card' },
          { id: 'logs', label: 'Auditoria Local', icon: 'history' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
              activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
           {activeTab === 'overview' && (
             <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-10 space-y-10 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">E-mail do Administrador</p>
                      <p className="text-sm font-bold">{school.adminEmail}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Data de Registro</p>
                      <p className="text-sm font-bold">{school.createdAt}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Último Acesso à Plataforma</p>
                      <p className="text-sm font-bold">{school.lastLoginAt}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">ID Único da Instância</p>
                      <code className="text-xs bg-slate-50 dark:bg-white/5 px-2 py-1 rounded font-black text-primary">{school.id}</code>
                   </div>
                </div>

                <div className="pt-10 border-t border-slate-100 dark:border-white/5">
                   <h3 className="text-sm font-black uppercase tracking-widest mb-6">Limites da Instância</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 dark:bg-white/2 rounded-2xl">
                         <div className="flex justify-between items-center mb-4">
                            <p className="text-[10px] font-black uppercase text-slate-400">Alunos Ativos</p>
                            <span className="text-xs font-black text-primary">84%</span>
                         </div>
                         <h4 className="text-2xl font-black">{school.activeStudents} / 1000</h4>
                         <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: '84%' }}></div>
                         </div>
                      </div>
                      <div className="p-6 bg-slate-50 dark:bg-white/2 rounded-2xl flex flex-col justify-center">
                         <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Plano Atual</p>
                         <div className="flex items-center justify-between">
                            <h4 className="text-2xl font-black text-cyan-500 uppercase">{school.planId.split('_')[1]}</h4>
                            <button className="text-[10px] font-black text-primary uppercase hover:underline">Fazer Upgrade</button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'users' && (
             <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-300">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 dark:bg-white/2">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Usuário</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400">Papel</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    <tr>
                      <td className="px-8 py-6">
                        <p className="text-sm font-bold">Admin Principal</p>
                        <p className="text-[10px] text-slate-400 font-medium">{school.adminEmail}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-black uppercase">Owner</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-primary text-xs font-black uppercase hover:underline">Resetar Senha</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-8 border-t border-slate-100 dark:border-white/5 text-center">
                   <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">+ Adicionar Novo Gerente</button>
                </div>
             </div>
           )}
        </div>

        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">Status dos Serviços</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Banco de Dados', status: 'Online', color: 'bg-emerald-500' },
                   { label: 'Filesystem (S3)', status: 'Online', color: 'bg-emerald-500' },
                   { label: 'Webhooks Gateway', status: 'Syncing', color: 'bg-cyan-500' },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">{s.label}</span>
                      <div className="flex items-center gap-2">
                         <span className="text-[9px] font-black uppercase text-slate-400">{s.status}</span>
                         <div className={`size-1.5 rounded-full ${s.color}`}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 p-8 rounded-[32px] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-black text-sm uppercase tracking-widest mb-2 text-primary">Zona Crítica</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">A deleção de uma escola remove permanentemente todos os dados de alunos, professores e histórico acadêmico.</p>
                <button className="w-full py-3 bg-red-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-red-500/10">Apagar Instância Permanentemente</button>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl text-white/5 rotate-12">delete_forever</span>
           </div>
        </div>
      </div>
    </Layout>
  );
};

export default BOEscolaDetalhe;
