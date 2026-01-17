
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const AlunoConta: React.FC = () => {
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
    <Layout role={UserRole.STUDENT}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Minha Conta</h1>
        <p className="text-slate-500 font-medium mt-1">Gerencie seus dados e configurações de privacidade.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm p-10 space-y-10">
               <div className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-50 dark:border-white/5 pb-10">
                  <div className="relative group">
                    <div className="size-32 rounded-[40px] bg-primary/10 border-2 border-primary/20 bg-cover bg-center overflow-hidden shadow-2xl" style={{ backgroundImage: 'url("https://i.pravatar.cc/150?u=lucas")' }}></div>
                    <button className="absolute -bottom-2 -right-2 size-10 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-xl">photo_camera</span>
                    </button>
                  </div>
                  <div className="flex-1 space-y-1 text-center md:text-left">
                     <h4 className="text-2xl font-black">Lucas Silva</h4>
                     <p className="text-sm font-bold text-slate-500">Curso: Engenharia de Software • 4º Período</p>
                     <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-2">RA: #ALU-2023001</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">E-mail Pessoal</label>
                    <input type="email" placeholder="seu-email@gmail.com" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Telefone / WhatsApp</label>
                    <input type="text" placeholder="(11) 99999-9999" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20"/>
                  </div>
               </div>

               <div className="pt-6 flex justify-end">
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="px-10 py-4 bg-primary text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                  >
                    {loading ? (
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : success ? (
                      <span className="material-symbols-outlined">check_circle</span>
                    ) : (
                      <span className="material-symbols-outlined">save</span>
                    )}
                    {success ? 'Dados Salvos' : 'Salvar Dados de Contato'}
                  </button>
               </div>
          </div>

          <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm p-10">
               <h3 className="text-lg font-black mb-8">Segurança</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Senha Atual</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl py-4 px-5 text-sm font-bold"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nova Senha</label>
                    <input type="password" placeholder="Nova senha" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl py-4 px-5 text-sm font-bold"/>
                  </div>
               </div>
               <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all">
                  Redefinir Senha
               </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-[#1a2b2b] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm p-8">
            <h3 className="text-sm font-black uppercase tracking-widest mb-8">Preferências</h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">Avisos por E-mail</p>
                    <p className="text-[10px] text-slate-500 font-medium">Novas notas publicadas</p>
                  </div>
                  <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="size-5 bg-primary rounded-full"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">Privacidade</p>
                    <p className="text-[10px] text-slate-500 font-medium">Ocultar RA de outros alunos</p>
                  </div>
                  <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="size-5 bg-primary rounded-full"></div>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-primary p-10 rounded-[40px] text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-primary/20">
             <div className="relative z-10">
                <h4 className="font-black text-2xl mb-4 leading-tight">Dúvidas Pedagógicas?</h4>
                <p className="text-white/80 text-sm leading-relaxed mb-10 font-medium">Caso identifique alguma inconsistência no seu RA ou curso, abra um chamado diretamente com a coordenação.</p>
                <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-sm hover:scale-[1.02] transition-transform shadow-lg">Abrir Chamado</button>
             </div>
             <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[120px] opacity-10 rotate-12 select-none">support_agent</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlunoConta;
