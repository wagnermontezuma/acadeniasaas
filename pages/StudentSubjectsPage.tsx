
import React, { useState } from 'react';
import Layout from '../components/Layout.tsx';
import { UserRole } from '../types.ts';
import { useNavigate } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  professor: string;
  code: string;
  nextClass: string;
  room: string;
  grade: number;
  attendance: number;
  color: string;
  icon: string;
}

const subjectsData: Subject[] = [
  { id: '1', name: 'Matemática Avançada', professor: 'Prof. Ricardo Mendes', code: 'MAT-402', nextClass: 'Terça, 08:00', room: 'Sala 402, Bloco C', grade: 9.2, attendance: 98, color: 'bg-blue-500', icon: 'functions' },
  { id: '2', name: 'Algoritmos e Estrutura de Dados', professor: 'Prof. Carlos Silveira', code: 'CC-105', nextClass: 'Quarta, 10:00', room: 'Lab 03', grade: 8.1, attendance: 92, color: 'bg-emerald-500', icon: 'code' },
  { id: '3', name: 'Física Quântica', professor: 'Prof. Alberto Rocha', code: 'FIS-301', nextClass: 'Segunda, 14:00', room: 'Auditório A', grade: 8.8, attendance: 100, color: 'bg-purple-500', icon: 'flare' },
  { id: '4', name: 'História Geral', professor: 'Profa. Ana Claudia', code: 'HIS-102', nextClass: 'Quinta, 08:00', room: 'Sala 201, Bloco B', grade: 8.0, attendance: 95, color: 'bg-amber-500', icon: 'history_edu' },
  { id: '5', name: 'Língua Portuguesa e Literatura', professor: 'Profa. Maria Helena', code: 'LPL-221', nextClass: 'Sexta, 10:00', room: 'Sala 105, Bloco A', grade: 6.8, attendance: 92, color: 'bg-rose-500', icon: 'menu_book' },
  { id: '6', name: 'Inteligência Artificial', professor: 'Prof. Marcos V.', code: 'CC-502', nextClass: 'Quarta, 13:00', room: 'Lab 05', grade: 8.5, attendance: 88, color: 'bg-cyan-500', icon: 'psychology' },
];

const StudentSubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = subjectsData.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout role={UserRole.STUDENT}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Minhas Disciplinas</h1>
          <p className="text-slate-500 font-medium mt-1">Acompanhe seu progresso e horários das disciplinas matriculadas.</p>
        </div>
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            placeholder="Buscar disciplina..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <div 
            key={subject.id} 
            className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`size-14 rounded-2xl ${subject.color} text-white flex items-center justify-center shadow-lg shadow-black/5`}>
                  <span className="material-symbols-outlined text-3xl">{subject.icon}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">CÓDIGO</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{subject.code}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight mb-1">
                  {subject.name}
                </h3>
                <p className="text-xs font-medium text-slate-500">{subject.professor}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Próxima Aula</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{subject.nextClass}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Local</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{subject.room}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Desempenho (Média)</span>
                    <span className="text-xs font-black text-primary">{subject.grade}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${subject.grade >= 7 ? 'bg-primary' : 'bg-amber-400'}`} 
                      style={{ width: `${(subject.grade / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequência</span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">{subject.attendance}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-1000" 
                      style={{ width: `${subject.attendance}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigate('/student/grades')}
                className="w-full py-3.5 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
              >
                Ver Detalhes
                <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
          <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
          <p className="text-lg font-black">Nenhuma disciplina encontrada</p>
          <p className="text-sm font-medium">Tente ajustar seus termos de busca.</p>
        </div>
      )}

      <footer className="mt-20 text-center py-8 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs font-bold text-slate-400">© 2024 Portal do Aluno • Colégio Alfa</p>
      </footer>
    </Layout>
  );
};

export default StudentSubjectsPage;
