
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const AvaliacoesNotas: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Avaliações e Notas</h1>
          <p className="text-slate-500 font-medium mt-1">Gerencie o desempenho acadêmico dos seus alunos.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsImportModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-black rounded-2xl hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-xl">upload_file</span>
            Importar CSV
          </button>
          <button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-xl">add</span>
            Criar Avaliação
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-10">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-wrap gap-6 items-center justify-between">
           <div className="flex gap-6">
              <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-slate-400">Turma Ativa</label>
                 <select className="bg-slate-50 dark:bg-white/5 border-none rounded-xl py-1.5 pl-3 pr-8 text-sm font-black">
                    <option>9º Ano A - Matutino</option>
                    <option>1º Ensino Médio B</option>
                 </select>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black uppercase text-slate-400">Avaliação</label>
                 <select className="bg-slate-50 dark:bg-white/5 border-none rounded-xl py-1.5 pl-3 pr-8 text-sm font-black">
                    <option>Prova Bimestral (P1)</option>
                    <option>Trabalho de Grupo (T1)</option>
                 </select>
              </div>
           </div>
           <button className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:underline">
              <span className="material-symbols-outlined text-sm">save</span> Salvar Rascunho
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aluno</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">RA</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Nota (0-10)</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Observação</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { name: "Alexandre Mendes", ra: "20240981", grade: "8.5", obs: "Excelente participação" },
                { name: "Beatriz Helena", ra: "20241022", grade: "4.2", obs: "Faltou conteúdo de revisão" },
                { name: "Carlos Eduardo", ra: "20241055", grade: "", obs: "" },
              ].map((aluno, i) => (
                <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors">
                  <td className="px-8 py-5">
                     <p className="text-sm font-bold text-slate-900 dark:text-white">{aluno.name}</p>
                  </td>
                  <td className="px-8 py-5 text-center text-xs text-slate-400 font-bold tracking-tighter">{aluno.ra}</td>
                  <td className="px-8 py-5">
                     <input type="text" defaultValue={aluno.grade} placeholder="-" className="w-14 h-10 mx-auto block bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center font-black text-primary focus:ring-2 focus:ring-primary/20" />
                  </td>
                  <td className="px-8 py-5">
                     <input type="text" defaultValue={aluno.obs} placeholder="Comentário pedagógico..." className="w-full max-w-xs bg-slate-50 dark:bg-white/5 border border-transparent rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10" />
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="material-symbols-outlined text-slate-300 hover:text-primary transition-colors">history</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mb-20">
         <button className="px-10 py-4 bg-emerald-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-3">
            <span className="material-symbols-outlined">send</span>
            Enviar Notas para Coordenação
         </button>
      </div>

      {/* Create Assessment Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1a2b2b] h-full shadow-2xl p-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black">Nova Avaliação</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome da Avaliação</label>
                <input type="text" placeholder="Ex: Prova Substitutiva - 2º Bim" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-4 px-5 text-sm font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tipo</label>
                    <select className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold">
                       <option>Prova</option>
                       <option>Trabalho</option>
                       <option>Simulado</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Peso (Valor)</label>
                    <input type="number" defaultValue="10" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-3 px-4 text-sm font-bold" />
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Data de Aplicação</label>
                <input type="date" className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl py-4 px-5 text-sm font-bold" />
              </div>
              <div className="pt-10">
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-primary/20">Configurar e Iniciar Lançamento</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {isImportModalOpen && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsImportModalOpen(false)}></div>
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a2b2b] rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-10 text-center">
                  <div className="size-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
                     <span className="material-symbols-outlined text-4xl">upload_file</span>
                  </div>
                  <h3 className="text-2xl font-black mb-2">Importar Notas via CSV</h3>
                  <p className="text-slate-500 font-medium mb-10">Certifique-se de que o arquivo contém as colunas <strong>RA</strong> e <strong>NOTA</strong>.</p>
                  
                  <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-16 mb-10 hover:border-primary transition-all cursor-pointer group">
                     <span className="material-symbols-outlined text-5xl text-slate-300 group-hover:text-primary mb-4">cloud_upload</span>
                     <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Arraste seu arquivo .csv aqui</p>
                     <p className="text-[10px] font-bold text-slate-400 mt-2">OU CLIQUE PARA SELECIONAR</p>
                  </div>

                  <div className="flex gap-4">
                     <button onClick={() => setIsImportModalOpen(false)} className="flex-1 py-4 text-sm font-black text-slate-400 hover:text-slate-600">Cancelar</button>
                     <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-lg shadow-primary/20">Iniciar Validação</button>
                  </div>
               </div>
               <div className="bg-slate-50 dark:bg-white/5 p-6 flex justify-between items-center px-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Modelos Disponíveis:</p>
                  <button className="text-[10px] font-black text-primary uppercase underline">Baixar Template .CSV</button>
               </div>
            </div>
         </div>
      )}
    </Layout>
  );
};

export default AvaliacoesNotas;
