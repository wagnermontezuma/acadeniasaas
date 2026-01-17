
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole, User } from '../../types.ts';

const initialUsers: User[] = [
  { name: "Ana Silva", email: "ana.silva@escola.com", role: "Professor", status: "Ativo" },
  { name: "Bruno Gomes", email: "bruno.g@escola.com", role: "Admin", status: "Pendente" },
  { name: "Carla Pereira", email: "c.pereira@escola.com", role: "Coordenador", status: "Ativo" },
];

const UsuariosPage: React.FC = () => {
  const [users] = useState<User[]>(initialUsers);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Layout role={UserRole.ADMIN}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Equipe e Acessos</h1>
          <p className="text-slate-500 font-medium mt-1">Gerencie permissões e convites da instituição.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-2xl hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-[20px]">upload_file</span>
            <span>Importar CSV</span>
          </button>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>Convidar Usuário</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400" placeholder="Buscar por nome ou e-mail..." type="text"/>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Filtrar por papel:</span>
            <select className="bg-slate-50 dark:bg-white/5 border-none rounded-lg text-xs font-bold py-1.5 pl-3 pr-8 focus:ring-2 focus:ring-primary/20 cursor-pointer">
              <option>Todos</option>
              <option>Admin</option>
              <option>Coordenação</option>
              <option>Professor</option>
            </select>
          </div>
        </div>

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-white/5">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Papel</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Gerenciar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((user, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-white/2 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500">{user.email}</td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">{user.role}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${user.status === 'Ativo' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                        <span className="text-xs font-bold">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl text-slate-400 hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="size-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-300">person_off</span>
            </div>
            <h3 className="text-lg font-black">Nenhum usuário encontrado</h3>
            <p className="text-slate-500 max-w-xs mt-1">Comece convidando os membros da sua equipe para a plataforma.</p>
            <button onClick={() => setIsDrawerOpen(true)} className="mt-6 text-primary font-bold hover:underline">Convidar primeiro usuário</button>
          </div>
        )}
      </div>

      {/* Invitation Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-[#1a2b2b] h-full shadow-2xl p-8 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black">Convidar Usuário</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">E-mail institucional</label>
                <input type="email" placeholder="exemplo@escola.com" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Papel de Acesso</label>
                <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20">
                  <option>Professor</option>
                  <option>Coordenação</option>
                  <option>Admin Escola</option>
                </select>
              </div>
              <div className="pt-6">
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-primary/20">Enviar Convite</button>
                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-tighter">O usuário receberá um link para definir a senha.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UsuariosPage;
