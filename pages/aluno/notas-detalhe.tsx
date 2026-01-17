
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { useNavigate, useParams } from 'react-router-dom';

const AlunoNotasDetalhe: React.FC = () => {
  const navigate = useNavigate();
  const { disciplineId } = useParams();

  const evaluations = [
    { title: 'P1 - Álgebra Linear', category: 'Avaliação Presencial', date: '15 mar, 2024', grade: '8.5', weight: '2.0', status: 'Publicado', obs: '"Demonstrou excelente domínio em sistemas lineares."' },
    { title: 'P2 - Geometria Analítica', category: 'Avaliação Presencial', date: '22 abr, 2024', grade: '7.0', weight: '2.0', status: 'Publicado', obs: '"Atenção redobrada às fórmulas de volume e projeções."' },
    { title: 'Trabalho Semestral', category: 'Projeto de Pesquisa', date: '10 mai, 2024', grade: '9.5', weight: '3.0', status: 'Publicado', obs: '"Excelente pesquisa bibliográfica e organização formal."' },
    { title: 'Simulado Global', category: 'Ambiente Virtual', date: '05 jun, 2024', grade: '6.5', weight: '1.0', status: 'Publicado', obs: '"Revisar urgentemente conteúdo de trigonometria básica."' },
  ];

  return (
    <Layout role={UserRole.STUDENT}>
      {/* Breadcrumb Corrected */}
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">
        <button onClick={() => navigate('/aluno/dashboard')} className="hover:text-primary">Início</button>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <button onClick={() => navigate('/aluno/notas')} className="hover:text-primary">Notas</button>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-slate-900 dark:text-white">{disciplineId?.toUpperCase() || 'DETALHE'}</span>
      </nav>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Detalhamento de Avaliações</h1>
          <p className="text-slate-500 font-medium mt-1">Disciplina: Matemática Avançada • 2024.1</p>
        </div>
        <button onClick={() => navigate('/aluno/notas')} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all">
          <span className="material-symbols-outlined text-xl">arrow_back</span> 
          Voltar para Lista
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Avaliação</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Nota</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Peso</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Feedback do Professor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {evaluations.map((ev, i) => (
                <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors">
                  <td className="px-8 py-8">
                    <p className="text-sm font-black text-slate-900 dark:text-white mb-0.5">{ev.title}</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{ev.category} • {ev.date}</p>
                  </td>
                  <td className="px-8 py-8">
                    <div className="bg-primary/10 text-primary size-12 rounded-2xl flex items-center justify-center font-black text-base mx-auto shadow-sm">
                      {ev.grade}
                    </div>
                  </td>
                  <td className="px-8 py-8 text-center">
                    <p className="text-sm font-bold text-slate-400">{ev.weight}</p>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex justify-center">
                      <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-500 text-[9px] font-black uppercase rounded-xl tracking-widest">
                        {ev.status}
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

      <div className="p-8 bg-primary/5 dark:bg-white/2 rounded-[32px] border border-dashed border-primary/20 flex items-center gap-6">
         <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-3xl">calculate</span>
         </div>
         <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-1">Cálculo de Média</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Sua média parcial nesta disciplina é calculada com base na média ponderada das avaliações publicadas acima. Notas não publicadas pela coordenação ainda não constam neste cálculo.</p>
         </div>
         <div className="ml-auto text-right pr-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Média Atual</p>
            <p className="text-4xl font-black text-primary">8.1</p>
         </div>
      </div>
    </Layout>
  );
};

export default AlunoNotasDetalhe;
