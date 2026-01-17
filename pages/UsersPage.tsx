
import React from 'react';
import Layout from '../components/Layout';
import { UserRole, User } from '../types';

const users: User[] = [
  { name: "Ana Silva", email: "ana.silva@escola.com", role: "Professor", status: "Ativo" },
  { name: "Bruno Gomes", email: "bruno.g@escola.com", role: "Admin", status: "Pendente" },
  { name: "Carla Pereira", email: "c.pereira@escola.com", role: "Coordenador", status: "Ativo" },
  { name: "Daniel Matos", email: "d.matos@escola.com", role: "Professor", status: "Inativo" }
];

const UsersPage: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Usuários</h2>
          <p className="text-slate-500 mt-1">Gerencie permissões e acessos dos membros da instituição.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-sm">upload_file</span>
            <span>Importar CSV</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-opacity-90 shadow-sm">
            <span className="material-symbols-outlined text-sm">person_add</span>
            <span>Convidar usuário</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Buscar por nome ou e-mail..." type="text"/>
          </div>
          <button className="text-slate-500 hover:text-slate-900 text-sm font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-lg">filter_list</span> Filtrar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Nome</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">E-mail</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Papel</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 text-xs font-bold uppercase tracking-wider">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`size-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-green-500' : user.status === 'Pendente' ? 'bg-amber-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;
