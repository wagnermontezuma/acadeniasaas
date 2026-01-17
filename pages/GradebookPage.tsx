
import React, { useState } from 'react';
import Layout from '../components/Layout.tsx';
import { UserRole } from '../types.ts';

interface StudentGrade {
  id: string;
  name: string;
  ra: string;
  avatar: string;
  grade: string;
  status: 'Aprovado' | 'Reprovado' | 'Pendente';
  observation: string;
  lastUpdate: string;
}

const initialStudents: StudentGrade[] = [
  { id: '1', name: 'Alexandre Mendonça', ra: '20240981', avatar: 'https://i.pravatar.cc/150?img=11', grade: '8.5', status: 'Aprovado', observation: 'Excelente participação em aula.', lastUpdate: '12 Out, 2023 14:30' },
  { id: '2', name: 'Beatriz Helena Santos', ra: '20241022', avatar: 'https://i.pravatar.cc/150?img=5', grade: '4.2', status: 'Reprovado', observation: 'Necessita reforço em recursividade.', lastUpdate: 'Hoje Agora mesmo' },
  { id: '3', name: 'Carlos Eduardo Lima', ra: '20241055', avatar: 'https://i.pravatar.cc/150?img=12', grade: '-', status: 'Pendente', observation: '', lastUpdate: '...' },
  { id: '4', name: 'Daniela Martins', ra: '20240995', avatar: 'https://i.pravatar.cc/150?img=9', grade: '9.8', status: 'Aprovado', observation: 'Melhor nota da turma.', lastUpdate: 'Ontem 18:15' },
];

const GradebookPage: React.FC = () => {
  const [students, setStudents] = useState(initialStudents);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'Reprovado': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400';
      case 'Pendente': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout role={UserRole.PROFESSOR}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
        <span>Início</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span>Minhas Turmas</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-bold">Gradebook</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Gradebook - Lançamento de Notas</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">upload_file</span>
            Importar CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Exportar
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#ef4444] text-white text-sm font-bold rounded-xl hover:bg-[#dc2626] transition-all shadow-lg shadow-red-500/20">
            <span className="material-symbols-outlined text-[20px]">send</span>
            Enviar para aprovação
          </button>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Turma</label>
            <div className="relative">
              <select className="w-full h-11 pl-4 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-semibold appearance-none focus:ring-2 focus:ring-primary/20">
                <option>3º Ano A - Matutino</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Disciplina</label>
            <div className="relative">
              <select className="w-full h-11 pl-4 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-semibold appearance-none focus:ring-2 focus:ring-primary/20">
                <option>Algoritmos e Estrutura de Dados</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avaliação</label>
            <div className="relative">
              <select className="w-full h-11 pl-4 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-semibold appearance-none focus:ring-2 focus:ring-primary/20">
                <option>Prova Bimestral - 2º Bimestre</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto gap-8">
        {['Mural', 'Avaliações', 'Gradebook', 'Materiais', 'Alunos'].map((tab) => (
          <button
            key={tab}
            className={`pb-4 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
              tab === 'Gradebook' ? 'border-[#ef4444] text-[#ef4444]' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grade Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Aluno</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Nota</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Situação</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Observação</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Última Atualização</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="size-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">RA: {student.ra}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="text" 
                      defaultValue={student.grade}
                      className="w-16 h-10 mx-auto block text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block min-w-[90px] ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <input 
                      type="text" 
                      placeholder="Adicionar observação..."
                      defaultValue={student.observation}
                      className="w-full h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-400 leading-tight">{student.lastUpdate}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-slate-400">Mostrando <span className="text-slate-900 dark:text-white">24</span> de <span className="text-slate-900 dark:text-white">42</span> alunos</p>
          <div className="flex items-center gap-2">
            <button className="size-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg bg-[#ef4444] text-white text-xs font-bold shadow-md shadow-red-500/20">1</button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-50">2</button>
            <button className="size-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sync Notification (Floating) */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500">
            <span className="material-symbols-outlined">cloud_done</span>
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">Sincronização Ativa</h4>
            <p className="text-[10px] font-medium text-slate-400">Suas alterações foram salvas automaticamente.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GradebookPage;
