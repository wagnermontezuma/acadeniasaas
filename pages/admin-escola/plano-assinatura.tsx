
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const PlanoAssinaturaPage: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-[#121716] dark:text-white">Plano e Assinatura</h1>
        <p className="text-[#67837f] mt-1 font-medium">Gestão da subscrição institucional Alfa Unidade Centro.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1a2b2b] border border-[#f1f4f3] dark:border-white/10 rounded-[32px] shadow-sm p-10">
            <div className="flex justify-between items-start mb-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">Status: Assinatura Ativa</span>
                <h3 className="text-2xl font-black">Premium Enterprise</h3>
              </div>
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Renovação Automática</span>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-[#121716] dark:text-white">950</span>
                  <span className="text-[10px] text-[#67837f] uppercase font-black tracking-widest">Alunos Ativos</span>
                </div>
                <span className="text-xs font-bold text-[#67837f]">Capacidade: 1.000 matrículas</span>
              </div>
              <div className="w-full bg-[#f1f4f3] dark:bg-white/5 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
              </div>
              <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/20 flex items-center gap-4">
                <span className="material-symbols-outlined text-amber-600 text-3xl">warning</span>
                <p className="text-sm text-amber-800 dark:text-amber-200 font-bold leading-tight">
                  Atenção: Você atingiu 95% da sua capacidade contratada.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-8 bg-white dark:bg-[#1a2b2b] border border-[#f1f4f3] dark:border-white/10 rounded-[32px] shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Próxima Fatura</p>
                <p className="text-3xl font-black">R$ 1.250,00</p>
                <p className="text-xs text-slate-500 font-bold mt-1">Vencimento: 10/06</p>
            </div>
            <div className="p-8 bg-white dark:bg-[#1a2b2b] border border-[#f1f4f3] dark:border-white/10 rounded-[32px] shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cartão Padrão</p>
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">credit_card</span>
                    <p className="text-sm font-black">•••• 4242</p>
                </div>
                <button className="text-xs text-primary font-black mt-3 hover:underline uppercase tracking-tighter">Alterar Método</button>
            </div>
          </div>
        </div>
        
        <div className="bg-primary p-10 rounded-[40px] text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-primary/20 min-h-[450px]">
          <div className="relative z-10">
            <h4 className="font-black text-3xl mb-4 leading-tight">Pronto para o próximo nível?</h4>
            <p className="text-white/80 text-sm leading-relaxed mb-10 font-medium">Libere relatórios avançados com IA e o novo módulo financeiro para gestão de cobranças.</p>
            <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3 text-sm font-bold">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Matrículas Ilimitadas
                </li>
                <li className="flex items-center gap-3 text-sm font-bold">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Módulo Financeiro Completo
                </li>
                <li className="flex items-center gap-3 text-sm font-bold">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Gerente de Conta Dedicado
                </li>
            </ul>
            <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-sm hover:scale-[1.02] transition-transform shadow-lg">Solicitar Cotação</button>
          </div>
          <span className="material-symbols-outlined absolute -right-12 -bottom-12 text-[220px] opacity-10 rotate-12 select-none">rocket_launch</span>
        </div>
      </div>
    </Layout>
  );
};

export default PlanoAssinaturaPage;
