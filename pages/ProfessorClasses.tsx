
import React from 'react';
import Layout from '../components/Layout.tsx';
import { UserRole } from '../types.ts';

interface ClassItem {
  id: string;
  name: string;
  code: string;
  students: number;
  schedule: string;
  room: string;
  status: 'Em andamento' | 'Concluída' | 'Pendente';
  color: string;
}

const professorClasses: ClassItem[] = [
  { id: '1', name: 'Física Aplicada II', code: 'FIS-402', students: 32, schedule: 'Segunda, 08:00 - 10:00', room: 'Sala 402, Bloco C', status: 'Em andamento', color: 'bg-blue-500' },
  { id: '2', name: 'Laboratório de Mecânica', code: 'LAB-105', students: 15, schedule: 'Terça, 14:00 - 17:00', room: 'Lab 03', status: 'Em andamento', color: 'bg-emerald-500' },
  { id: '3', name: 'Matemática Computacional', code: 'MAT-221', students: 45, schedule: 'Quarta, 10:00 - 12:00', room: 'Auditório A', status: 'Em andamento', color: 'bg-purple-500' },
  { id: '4', name: 'Eletromagnetismo I', code: 'FIS-301', students: 28, schedule: 'Sexta, 08:00 - 10:00', room: 'Sala 201, Bloco B', status: 'Pendente', color: 'bg-amber-500' },
];

const ProfessorClasses: React.FC = () => {
  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#111718] dark:text-white tracking-tight">Minhas Turmas</h1>
          <p className="text-[#638788] mt-1 font-medium">Gerencie suas disciplinas, frequências e materiais didáticos.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">print</span>
            <span>Relatórios</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">add_task</span>
            <span>Nova Chamada</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total de Alunos</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black">120</h3>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">+12% vs sem. passado</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Média de Frequência</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black">88.5%</h3>
            <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '88.5%' }}></div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Avaliações Pendentes</p>
          <div className="flex items-end justify-between">
            <h3 className="text-3xl font-black">04</h3>
            <span className="text-amber-500 text-xs font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg">Urgente</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative max-w-sm w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            placeholder="Buscar turma por nome ou código..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Visualização:</span>
            <button className="p-2 rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="material-symbols-outlined">format_list_bulleted</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {professorClasses.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className={`size-12 rounded-xl ${item.color} text-white flex items-center justify-center font-black text-lg shadow-lg shadow-black/5`}>
                    {item.code.split('-')[0]}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.code} • {item.students} Alunos</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase ${item.status === 'Em andamento' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.status}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                    </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <span className="text-xs font-medium">{item.schedule.split(',')[0]}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                  <span className="text-xs font-medium line-clamp-1">{item.room}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span className="text-xs font-medium">{item.schedule.split(',')[1]}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                  <span className="text-xs font-medium">Matriz 2024.1</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    Entrar na Turma
                </button>
                <button className="size-11 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary hover:bg-primary/10 transition-all border border-slate-100 dark:border-slate-800" title="Diário de Classe">
                    <span className="material-symbols-outlined text-[20px]">menu_book</span>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="size-6 rounded-full border-2 border-white dark:border-slate-800 bg-cover" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})` }}></div>
                    ))}
                    <div className="size-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold">+{item.students - 3}</div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Último lançamento: Há 2 horas</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProfessorClasses;
