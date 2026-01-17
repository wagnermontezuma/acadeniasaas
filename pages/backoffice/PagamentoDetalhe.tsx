
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { backofficeMocks } from '../../data/backofficeMocks.ts';

const BOPagamentoDetalhe: React.FC = () => {
  const { paymentId } = useParams();
  const payment = backofficeMocks.payments.find(p => p.id === paymentId);

  if (!payment) return <Layout role={UserRole.BACKOFFICE}><div className="p-20 text-center">Pagamento não encontrado.</div></Layout>;

  return (
    <Layout role={UserRole.BACKOFFICE}>
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
          <Link to="/backoffice/pagamentos" className="hover:text-primary">Transações</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-white">Detalhes do Recebimento</span>
        </nav>
        <h1 className="text-3xl font-black tracking-tight">Transação {payment.invoiceId}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white dark:bg-slate-900 p-10 rounded-[32px] border border-slate-200 dark:border-slate-800 space-y-8">
            <div className="flex justify-between items-start border-b border-slate-50 dark:border-white/5 pb-8">
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Valor Líquido</p>
                  <h3 className="text-4xl font-black text-primary">R$ {payment.amount.toLocaleString()}</h3>
               </div>
               <span className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">{payment.status}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Método de Pagamento</p>
                  <p className="text-sm font-bold">{payment.method}</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Gateway Utilizado</p>
                  <p className="text-sm font-bold">{payment.gateway}</p>
               </div>
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-10 rounded-[32px] border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-black uppercase tracking-widest mb-8">Timeline da Transação</h3>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100 dark:before:bg-white/5">
               <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 size-6 rounded-full bg-primary text-white flex items-center justify-center border-4 border-white dark:border-slate-900">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                  </div>
                  <p className="text-sm font-bold">Transação Criada</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{payment.createdAt} 14:00:22</p>
               </div>
               <div className="relative pl-10 opacity-50">
                  <div className="absolute left-0 top-1.5 size-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center border-4 border-white dark:border-slate-900">
                    <span className="material-symbols-outlined text-[12px]">refresh</span>
                  </div>
                  <p className="text-sm font-bold">Aguardando Confirmação Webhook</p>
               </div>
            </div>
         </div>
      </div>
    </Layout>
  );
};

export default BOPagamentoDetalhe;
