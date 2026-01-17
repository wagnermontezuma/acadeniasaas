
import React from 'react';
import Layout from '../components/Layout';
import { UserRole } from '../types';

const SubscriptionPage: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-[#121716] dark:text-white">Plano e Assinatura</h1>
        <p className="text-[#67837f] mt-2">Gerencie seu plano e visualize o status da sua conta corporativa.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-[#f1f4f3] dark:border-gray-800 rounded-xl shadow-sm p-8">
            <div className="flex justify-between items-start mb-10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Status Ativo</span>
                <h3 className="text-2xl font-black">Plano Premium Enterprise</h3>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Assinado</span>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-[#121716] dark:text-white">950</span>
                  <span className="text-xs text-[#67837f] uppercase font-bold tracking-wider">Alunos Ativos</span>
                </div>
                <span className="text-sm font-bold text-[#67837f]">Limite: 1.000 matrículas</span>
              </div>
              <div className="w-full bg-[#f1f4f3] dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-800/20 flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-600">warning</span>
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                  <strong>Capacidade Crítica:</strong> Você atingiu 95% da sua capacidade. Considere um upgrade para evitar interrupções.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-xl shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Próxima Fatura</p>
                <p className="text-2xl font-black">R$ 1.250,00</p>
                <p className="text-xs text-slate-500 mt-1">Vencimento em 10/06/2024</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-xl shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Método de Pagamento</p>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                    <p className="text-sm font-bold">•••• 4242</p>
                </div>
                <button className="text-xs text-primary font-bold mt-2 hover:underline">Alterar cartão</button>
            </div>
          </div>
        </div>
        
        <div className="bg-primary p-8 rounded-2xl text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-primary/20 min-h-[400px]">
          <div className="relative z-10">
            <h4 className="font-black text-2xl mb-4">Upgrade do Plano</h4>
            <p className="text-white/80 text-sm leading-relaxed mb-8">Libere matrículas ilimitadas, relatórios avançados de IA e o novo módulo de gestão financeira integrada.</p>
            <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Alunos ilimitados
                </li>
                <li className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    API de Integração
                </li>
                <li className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Suporte 24/7 VIP
                </li>
            </ul>
            <button className="w-full py-4 bg-white text-primary rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-lg">Ver Planos Enterprise</button>
          </div>
          <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] opacity-10 rotate-12 select-none">rocket_launch</span>
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionPage;
