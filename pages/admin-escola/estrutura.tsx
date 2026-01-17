
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const modules = [
  { title: "Períodos Letivos", desc: "Configuração de semestres, anos e férias.", icon: "calendar_month", progress: 100, status: "Concluído" },
  { title: "Cursos e Matrizes", desc: "Gestão da grade curricular e matrizes.", icon: "school", progress: 65, status: "Em andamento" },
  { title: "Turmas e Vagas", desc: "Organização de salas, turnos e agrupamento.", icon: "groups", progress: 0, status: "Não iniciado" },
  { title: "Catálogo de Disciplinas", desc: "Lista completa de matérias e ementas.", icon: "menu_book", progress: 0, status: "Não iniciado" }
];

const EstruturaPage: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black text-[#111718] dark:text-white tracking-tight mb-2">Estrutura Acadêmica</h2>
          <p className="text-[#638788] dark:text-gray-400 font-medium leading-relaxed">
            Configure os pilares da sua unidade. Complete as etapas para habilitar o gerenciamento completo de matrículas e avaliações.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all shrink-0">
          <span className="material-symbols-outlined">add</span>
          <span>Configurar Novo</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {modules.map((item, idx) => (
          <div key={idx} className={`bg-white dark:bg-[#1a2b2b] p-8 rounded-[32px] border transition-all ${item.status === 'Em andamento' ? 'border-primary shadow-md' : 'border-[#e6e8eb] dark:border-white/5 shadow-sm hover:shadow-lg'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className={`size-14 rounded-2xl flex items-center justify-center ${item.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
                <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
              </div>
              <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${item.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'}`}>{item.status}</span>
            </div>
            <h4 className="text-xl font-black text-[#111718] dark:text-white mb-2">{item.title}</h4>
            <p className="text-sm text-[#638788] dark:text-gray-400 mb-8 font-medium">{item.desc}</p>
            <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ${item.status === 'Concluído' ? 'bg-emerald-500' : 'bg-primary'}`} style={{ width: `${item.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default EstruturaPage;
