
import React from 'react';
import Layout from '../components/Layout';
import { UserRole } from '../types';

const modules = [
  { title: "Períodos Letivos", desc: "Configuração de semestres, anos e férias.", icon: "calendar_month", progress: 100, status: "Concluído" },
  { title: "Cursos e Matrizes", desc: "Gestão da grade curricular e matrizes.", icon: "school", progress: 65, status: "Em andamento" },
  { title: "Turmas e Vagas", desc: "Organização de salas, turnos e agrupamento.", icon: "groups", progress: 0, status: "Não iniciado" },
  { title: "Catálogo de Disciplinas", desc: "Lista completa de matérias e ementas.", icon: "menu_book", progress: 0, status: "Não iniciado" },
  { title: "Vínculos Docentes", desc: "Atribuição de professores às turmas.", icon: "link", progress: 0, status: "Não iniciado" }
];

const AcademicStructure: React.FC = () => {
  return (
    <Layout role={UserRole.ADMIN}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black text-[#111718] dark:text-white tracking-tight mb-2">Estrutura Acadêmica</h2>
          <p className="text-lg text-[#638788] dark:text-gray-400 leading-relaxed">
            Organize os pilares da sua instituição. Complete as etapas abaixo para habilitar o gerenciamento completo.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all shrink-0">
          <span className="material-symbols-outlined">add</span>
          <span>Configurar Módulo</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((item, idx) => (
          <div key={idx} className={`bg-white dark:bg-gray-800 p-6 rounded-2xl border transition-all ${item.status === 'Em andamento' ? 'border-primary shadow-md' : 'border-[#e6e8eb] dark:border-gray-700 shadow-sm hover:shadow-md'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`size-12 rounded-xl flex items-center justify-center ${item.status === 'Concluído' ? 'bg-green-50 text-green-600' : 'bg-primary/10 text-primary'}`}>
                <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'Concluído' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>{item.status}</span>
            </div>
            <h4 className="text-lg font-bold text-[#111718] dark:text-white mb-1">{item.title}</h4>
            <p className="text-sm text-[#638788] dark:text-gray-400 mb-6">{item.desc}</p>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${item.status === 'Concluído' ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${item.progress}%` }}></div>
            </div>
          </div>
        ))}
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary transition-colors min-h-[200px]">
          <div className="size-12 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-[32px]">add</span>
          </div>
          <p className="text-sm font-bold text-gray-500 group-hover:text-primary">Novo Módulo</p>
        </div>
      </div>
    </Layout>
  );
};

export default AcademicStructure;
