
import React from 'react';
import Layout from '../components/Layout.tsx';
import { UserRole } from '../types.ts';
import { useNavigate } from 'react-router-dom';

const SubjectGradesPage: React.FC = () => {
  const navigate = useNavigate();

  const evaluations = [
    { title: 'P1 - Álgebra Linear', category: 'Avaliação Presencial', date: '15 mar, 2024', grade: '8.5', weight: '2.0', status: 'Publicado', obs: '"Demonstrou excelente domínio em sistemas lineares."' },
    { title: 'P2 - Geometria Analítica', category: 'Avaliação Presencial', date: '22 abr, 2024', grade: '7.0', weight: '2.0', status: 'Publicado', obs: '"Atenção redobrada às fórmulas de volume e projeções."' },
    { title: 'Trabalho Semestral', category: 'Projeto de Pesquisa', date: '10 mai, 2024', grade: '9.5', weight: '3.0', status: 'Publicado', obs: '"Excelente pesquisa bibliográfica e organização formal."' },
    { title: 'Simulado Geral', category: 'Ambiente Virtual', date: '05 jun, 2024', grade: '6.5', weight: '1.0', status: 'Publicado', obs: '"Revisar urgentemente conteúdo de trigonometria básica."' },
  ];

  return (
    <Layout role={UserRole.STUDENT}>
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
          <span>Início</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span>Boletim Semestral</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-bold">Matemática</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Notas – Matemática</h1>
            <p className="text-slate-500 font-medium italic">Semestre Letivo: 2024.1 • Prof. Dr. Carlos Silveira</p>
          </div>
          <button onClick={() => navigate('/student/report-card')} className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">arrow_back</span> Voltar ao Boletim
          </button>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/20 rounded-[32px] p-8 mb-10 flex gap-6 items-start">
        <div className="size-12 rounded-2xl bg-amber-400 flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined text-3xl font-black">info</span>
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white mb-1">Aviso Importante</h4>
            <p className="text-sm font-medium text-slate-500">Apenas avaliações publicadas são exibidas. Notas em processamento não constam nesta lista.</p>
          </div>
          <button className="text-xs font-black text-primary uppercase flex items-center gap-1 group">
            Ver política de notas <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Grades Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Avaliação</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Nota</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Peso</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Observações do Professor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {evaluations.map((ev, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/1 transition-colors">
                  <td className="px-8 py-8">
                    <p className="text-sm font-black text-slate-900 dark:text-white mb-0.5">{ev.title}</p>
                    <p className="text-[10px] font-medium text-slate-400">{ev.category}</p>
                  </td>
                  <td className="px-8 py-8">
                    <p className="text-xs font-bold text-slate-500">{ev.date}</p>
                  </td>
                  <td className="px-8 py-8">
                    <div className="bg-green-50 dark:bg-green-900/10 text-green-600 size-11 rounded-lg flex items-center justify-center font-black text-base mx-auto">
                      {ev.grade}
                    </div>
                  </td>
                  <td className="px-8 py-8 text-center">
                    <p className="text-sm font-bold text-slate-400">{ev.weight}</p>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex justify-center">
                      <span className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 text-[10px] font-black uppercase rounded-full">
                        • {ev.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <p className="text-xs font-medium text-slate-500 italic leading-relaxed max-w-xs">{ev.obs}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="flex gap-12">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Média Parcial</p>
            <h5 className="text-3xl font-black text-primary">8.1</h5>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequência</p>
            <h5 className="text-3xl font-black text-slate-900 dark:text-white">92%</h5>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm rounded-xl">
            <span className="material-symbols-outlined">print</span> Imprimir Relatório
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm rounded-xl">
            <span className="material-symbols-outlined">share</span> Exportar PDF
          </button>
        </div>
      </div>

      <footer className="text-center py-8 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs font-bold text-slate-400">© 2024 Portal Acadêmico. Todos os direitos reservados.</p>
      </footer>
    </Layout>
  );
};

export default SubjectGradesPage;
