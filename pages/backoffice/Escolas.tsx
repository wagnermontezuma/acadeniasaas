
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';
import { Link } from 'react-router-dom';

const BOEscolas: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [impersonated, setImpersonated] = useState<string | undefined>(undefined);
  const [isProvisioning, setIsProvisioning] = useState(false);

  const filteredSchools = backofficeMocks.schools.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.adminEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Todas' || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleImpersonate = (name: string) => {
    setImpersonated(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout role={UserRole.BACKOFFICE} impersonatingSchool={impersonated}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Escolas (Tenants)</h1>
          <p className="text-slate-500 font-medium mt-1">Gestão de instâncias e conformidade contratual do ecossistema.</p>
        </div>
        <button 
          onClick={() => setIsProvisioning(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          <span className="material-symbols-outlined text-xl">add_business</span>
          Provisionar Nova Escola
        </button>
      </div>

      <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-wrap gap-6 items-center justify-between">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Buscar por nome, email ou subdomínio..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            {['Todas', 'Ativa', 'Suspensa', 'Trial'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 dark:bg-white/5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-white/2">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Escola / Subdomínio</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Plano</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider text-center">Alunos</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider">Data Criação</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredSchools.map((school) => (
                <tr key={school.id} className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-2xl">school</span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{school.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{school.domain}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      school.status === 'Ativa' ? 'bg-emerald-500/10 text-emerald-500' : 
                      school.status === 'Suspensa' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {school.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-tight">{school.planId.replace('plan_', '')}</span>
                  </td>
                  <td className="px-8 py-6 text-center text-sm font-black">{school.activeStudents}</td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-400">{school.createdAt}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-1.5">
                       <Link to={`/backoffice/escolas/${school.id}`} className="size-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all" title="Gerenciar Configurações">
                          <span className="material-symbols-outlined text-[20px]">settings</span>
                       </Link>
                       <button 
                        onClick={() => handleImpersonate(school.name)}
                        className="size-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 transition-all" title="Impersonar Acesso"
                       >
                          <span className="material-symbols-outlined text-[20px]">login</span>
                       </button>
                       <button className="size-9 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all" title="Suspender Tenant">
                          <span className="material-symbols-outlined text-[20px]">block</span>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSchools.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">search_off</span>
            <h4 className="text-lg font-black uppercase tracking-widest">Nenhuma escola encontrada</h4>
            <p className="text-slate-500 mt-1">Ajuste os filtros ou o termo de busca para localizar o tenant.</p>
          </div>
        )}

        <div className="p-6 bg-slate-50/50 dark:bg-white/2 flex justify-between items-center px-10 border-t border-slate-100 dark:border-white/5">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total: {filteredSchools.length} escolas listadas</p>
          <div className="flex gap-2">
            <button className="size-9 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="size-9 rounded-xl bg-primary text-white font-black text-xs shadow-lg shadow-primary/20">1</button>
            <button className="size-9 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de Provisionamento Simulado */}
      {isProvisioning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
           <div className="bg-white dark:bg-[#1a2b2b] rounded-[40px] p-10 max-w-xl w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-white/5">
              <div className="flex justify-between items-start mb-8">
                 <div>
                    <h3 className="text-2xl font-black">Provisionar Escola</h3>
                    <p className="text-sm font-medium text-slate-500">Crie uma nova instância para a rede de ensino.</p>
                 </div>
                 <button onClick={() => setIsProvisioning(false)} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center text-slate-400"><span className="material-symbols-outlined">close</span></button>
              </div>
              <div className="grid gap-5">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nome da Instituição</label>
                    <input type="text" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3.5 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20" placeholder="Ex: Colégio Anglo Matriz" />
                 </div>
                 <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Domínio/Slug</label>
                        <input type="text" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3.5 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20" placeholder="anglo-matriz" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Plano Inicial</label>
                        <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3.5 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20">
                           <option>Trial (14 dias)</option>
                           <option>Basic</option>
                           <option>Pro</option>
                           <option>Enterprise</option>
                        </select>
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">E-mail Administrativo</label>
                    <input type="email" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3.5 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20" placeholder="direcao@escola.com.br" />
                 </div>
              </div>
              <div className="mt-10 flex gap-4">
                 <button onClick={() => setIsProvisioning(false)} className="flex-1 py-4 text-xs font-black uppercase text-slate-400 hover:text-slate-600">Cancelar</button>
                 <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">Ativar Instância</button>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default BOEscolas;
