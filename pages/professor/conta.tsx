
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const ProfessorConta: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Minha Conta</h1>
        <p className="text-slate-500 font-medium mt-1">Gerencie suas informações pessoais e configurações de segurança.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Perfil e Dados Básicos */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-white/5">
               <h3 className="text-lg font-black">Meu Perfil</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Informações de identificação</p>
            </div>
            <div className="p-8 space-y-8">
               <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="size-32 rounded-[40px] bg-primary/10 border-2 border-primary/20 bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=prof")' }}></div>
                    <button className="absolute -bottom-2 -right-2 size-10 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-xl">photo_camera</span>
                    </button>
                  </div>
                  <div className="flex-1 space-y-1 text-center md:text-left">
                     <h4 className="text-xl font-black">Ricardo Silveira</h4>
                     <p className="text-sm font-bold text-slate-500">Docente Titular • Matemática e Física</p>
                     <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-2">ID Funcional: #PROF-99281</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nome Completo</label>
                    <input type="text" readOnly value="Ricardo Silveira de Alcantara" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-400 cursor-not-allowed"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">E-mail Institucional</label>
                    <input type="email" readOnly value="ricardo.silveira@escola.com" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-400 cursor-not-allowed"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Telefone de Contato</label>
                    <input type="text" placeholder="(11) 99999-9999" className="w-full bg-slate-50 dark:bg-white/10 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Disciplina Principal</label>
                    <input type="text" readOnly value="Matemática Avançada" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-400 cursor-not-allowed"/>
                  </div>
               </div>

               <div className="pt-4 flex justify-end">
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="px-10 py-3.5 bg-primary text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                  >
                    {loading ? (
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : success ? (
                      <span className="material-symbols-outlined">check_circle</span>
                    ) : (
                      <span className="material-symbols-outlined">save</span>
                    )}
                    {success ? 'Alterações Salvas' : 'Salvar Alterações'}
                  </button>
               </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-white/5">
               <h3 className="text-lg font-black">Segurança</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Gestão de acessos e senhas</p>
            </div>
            <div className="p-8 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Senha Atual</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/10 border-none rounded-xl py-3 px-4 text-sm font-bold"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nova Senha</label>
                    <input type="password" placeholder="Min. 8 caracteres" className="w-full bg-slate-50 dark:bg-white/10 border-none rounded-xl py-3 px-4 text-sm font-bold"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Confirmar Nova</label>
                    <input type="password" placeholder="Confirme a senha" className="w-full bg-slate-50 dark:bg-white/10 border-none rounded-xl py-3 px-4 text-sm font-bold"/>
                  </div>
               </div>
               <div className="flex justify-end">
                  <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all">
                    Atualizar Senha
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar de Preferências */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm p-8">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">Preferências</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">Notificações</p>
                    <p className="text-[10px] text-slate-500 font-medium">Receber alertas por e-mail</p>
                  </div>
                  <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="size-5 bg-primary rounded-full"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">Modo Compacto</p>
                    <p className="text-[10px] text-slate-500 font-medium">Otimizar tabelas de notas</p>
                  </div>
                  <div className="size-10 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                    <div className="size-5 bg-slate-300 rounded-full"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">Privacidade</p>
                    <p className="text-[10px] text-slate-500 font-medium">Ocultar status online</p>
                  </div>
                  <div className="size-10 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                    <div className="size-5 bg-slate-300 rounded-full"></div>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 rounded-[32px] p-8 text-center">
             <span className="material-symbols-outlined text-red-500 text-3xl mb-4">gpp_maybe</span>
             <h4 className="text-sm font-black text-red-500 uppercase tracking-widest">Zona Crítica</h4>
             <p className="text-xs text-slate-500 mt-2 leading-relaxed">Para solicitar o desligamento da plataforma ou transferência de unidade, entre em contato com a coordenação.</p>
             <button className="mt-6 text-[10px] font-black text-red-500 uppercase hover:underline">Abrir Chamado</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessorConta;
