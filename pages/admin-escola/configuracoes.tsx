
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const Configuracoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'identity' | 'logos' | 'colors'>('identity');

  return (
    <Layout role={UserRole.ADMIN}>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Configurações da Unidade</h1>
        <p className="text-slate-500 font-medium mt-1">Personalize a identidade e o comportamento da plataforma para sua escola.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        {/* Task A: Sidebar Tabs */}
        <aside className="w-full md:w-64 border-r border-slate-100 dark:border-white/5 p-6 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('identity')}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all font-bold text-sm text-left ${activeTab === 'identity' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined text-[22px]">badge</span>
            Identidade Visual
          </button>
          <button 
            onClick={() => setActiveTab('logos')}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all font-bold text-sm text-left ${activeTab === 'logos' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined text-[22px]">image</span>
            Logotipos
          </button>
          <button 
            onClick={() => setActiveTab('colors')}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all font-bold text-sm text-left ${activeTab === 'colors' ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
          >
            <span className="material-symbols-outlined text-[22px]">palette</span>
            Cores do Tema
          </button>
        </aside>

        <main className="flex-1 p-10">
          {activeTab === 'identity' && (
            <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-black mb-1">Identidade Visual</h3>
                <p className="text-sm text-slate-500 font-medium">Nome e informações básicas da instituição.</p>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome Fantasia</label>
                  <input type="text" defaultValue="Colégio Alfa - Unidade Centro" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold"/>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Razão Social</label>
                  <input type="text" defaultValue="Alfa Educação e Tecnologia LTDA" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">CNPJ</label>
                    <input type="text" defaultValue="00.000.000/0001-00" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Inscrição Estadual</label>
                    <input type="text" defaultValue="Isento" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm"/>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button className="px-8 py-3 bg-primary text-white rounded-xl font-black text-sm shadow-lg shadow-primary/20">Salvar Alterações</button>
              </div>
            </div>
          )}

          {activeTab === 'logos' && (
            <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-black mb-1">Logotipos</h3>
                <p className="text-sm text-slate-500 font-medium">Arquivos de imagem para marca em diferentes contextos.</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Logo Principal (Light)</p>
                   <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-primary transition-all">
                      <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-primary mb-2">cloud_upload</span>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">SVG ou PNG (512x512)</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Logo Principal (Dark)</p>
                   <div className="aspect-square bg-slate-900 border-2 border-dashed border-white/10 rounded-[24px] flex flex-col items-center justify-center p-8 text-center group cursor-pointer hover:border-primary transition-all">
                      <span className="material-symbols-outlined text-3xl text-white/10 group-hover:text-primary mb-2">cloud_upload</span>
                      <p className="text-[10px] font-bold text-white/20 uppercase">SVG ou PNG (512x512)</p>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="max-w-2xl space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-black mb-1">Cores do Tema</h3>
                <p className="text-sm text-slate-500 font-medium">Defina a paleta cromática padrão da sua instituição.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-primary rounded-lg shadow-sm"></div>
                      <div>
                        <p className="text-sm font-bold">Cor Primária</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">#18C7CD</p>
                      </div>
                    </div>
                    <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">edit</button>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-slate-900 rounded-lg shadow-sm border border-white/10"></div>
                      <div>
                        <p className="text-sm font-bold">Cor de Fundo</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase">#112121</p>
                      </div>
                    </div>
                    <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">edit</button>
                 </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Configuracoes;
