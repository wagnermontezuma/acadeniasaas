
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

interface Comunicado {
  id: string;
  title: string;
  status: 'Ativo' | 'Expirado' | 'Agendado';
  target: string;
  date: string;
}

const mockComunicados: Comunicado[] = [
  { id: '1', title: 'Reunião de Pais e Mestres - 2º Bimestre', status: 'Ativo', target: 'Pais, Alunos', date: '25/05/2024' },
  { id: '2', title: 'Manutenção Preventiva do Laboratório', status: 'Agendado', target: 'Professores', date: '01/06/2024' },
  { id: '3', title: 'Recesso de Tiradentes', status: 'Expirado', target: 'Todos', date: '21/04/2024' },
];

const ComunicadosPage: React.FC = () => {
  const [comunicados, setComunicados] = useState<Comunicado[]>(mockComunicados);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean, id: string | null }>({ isOpen: false, id: null });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-emerald-500/10 text-emerald-500';
      case 'Agendado': return 'bg-amber-500/10 text-amber-500';
      case 'Expirado': return 'bg-slate-500/10 text-slate-500';
      default: return 'bg-slate-500/10';
    }
  };

  const handleDelete = () => {
    if (deleteModal.id) {
      setComunicados(prev => prev.filter(c => c.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  return (
    <Layout role={UserRole.ADMIN}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Comunicação</h1>
          <p className="text-slate-500 font-medium mt-1">Envie avisos institucionais para sua unidade.</p>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add_alert</span>
          <span>Novo Comunicado</span>
        </button>
      </div>

      {comunicados.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-20 text-center flex flex-col items-center flex-1 min-h-[400px]">
          <div className="size-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-5xl text-primary/40">broadcast_on_home</span>
          </div>
          <h3 className="text-xl font-black">Sua caixa de avisos está vazia</h3>
          <p className="text-slate-500 max-w-sm mt-2 leading-relaxed font-medium">
            Mantenha pais, alunos e professores informados sobre eventos e reuniões importantes.
          </p>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="mt-8 px-8 py-3 bg-slate-50 dark:bg-white/5 text-primary text-sm font-black rounded-xl hover:bg-primary hover:text-white transition-all"
          >
            Criar meu primeiro comunicado
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-6 mb-2">
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Filtrando: Todos ({comunicados.length})</span>
             <button className="text-[10px] font-black text-primary uppercase hover:underline">Ver Histórico Completo</button>
          </div>
          
          {comunicados.map((com) => (
            <div key={com.id} className="bg-white dark:bg-[#1a2b2b] rounded-3xl p-6 border border-slate-100 dark:border-white/5 shadow-sm hover:border-primary/30 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className={`size-12 rounded-2xl flex items-center justify-center ${getStatusStyle(com.status)}`}>
                  <span className="material-symbols-outlined font-black">campaign</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{com.title}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Público: {com.target}</span>
                    <span className="size-1 bg-slate-200 dark:bg-white/10 rounded-full"></span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Publicado em: {com.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${getStatusStyle(com.status)} mr-4`}>
                  {com.status}
                </span>
                <button 
                  className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all flex items-center justify-center"
                  title="Editar Comunicado"
                >
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </button>
                <button 
                  onClick={() => setDeleteModal({ isOpen: true, id: com.id })}
                  className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
                  title="Remover"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center pt-8">
            <button className="px-10 py-3 bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-all rounded-full border border-transparent hover:border-primary/20">
              Ver comunicados anteriores
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal (Task C) */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteModal({ isOpen: false, id: null })}></div>
           <div className="relative w-full max-w-sm bg-white dark:bg-[#1a2b2b] rounded-[32px] p-10 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
              <div className="size-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-red-500">warning</span>
              </div>
              <h3 className="text-2xl font-black mb-2">Excluir Aviso?</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Esta ação é irreversível e o comunicado será removido do painel de todos os usuários.</p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                 <button 
                  onClick={() => setDeleteModal({ isOpen: false, id: null })}
                  className="py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600"
                 >
                   Cancelar
                 </button>
                 <button 
                  onClick={handleDelete}
                  className="py-4 bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-500/20 hover:opacity-90"
                 >
                   Confirmar
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Creation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1a2b2b] h-full shadow-2xl p-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black">Novo Comunicado</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assunto / Título</label>
                <input type="text" placeholder="Ex: Aviso de Feriado Municipal" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Público de Destino</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Alunos', 'Pais/Respon.', 'Professores', 'Todos'].map(target => (
                    <button key={target} className="py-3 px-4 rounded-xl border border-slate-100 dark:border-white/5 text-xs font-bold hover:border-primary transition-all text-left flex justify-between group">
                      {target}
                      <span className="material-symbols-outlined text-sm text-slate-200 group-hover:text-primary">check_circle</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mensagem</label>
                <textarea rows={6} placeholder="Descreva aqui o aviso para a unidade..." className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-4 px-5 text-sm focus:ring-2 focus:ring-primary/20 resize-none"></textarea>
              </div>
              <div className="pt-6">
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">rocket_launch</span>
                  Disparar Comunicado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ComunicadosPage;
