
import React from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { useNavigate } from 'react-router-dom';

const AlunoNotas: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    { id: 'matematica', name: 'Matemática Avançada', prof: 'Prof. Ricardo Mendes', avg: '9.2', status: 'Aprovado' },
    { id: 'portugues', name: 'Língua Portuguesa', prof: 'Profa. Maria Helena', avg: '6.8', status: 'Em andamento' },
    { id: 'fisica', name: 'Física Quântica', prof: 'Prof. Alberto Rocha', avg: '8.8', status: 'Aprovado' },
    { id: 'historia', name: 'História Geral', prof: 'Profa. Ana Claudia', avg: '8.0', status: 'Aprovado' },
  ];

  return (
    <Layout role={UserRole.STUDENT}>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Notas por Disciplina</h1>
        <p className="text-slate-500 font-medium mt-1">Clique em uma disciplina para ver o detalhamento de cada avaliação.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disciplina</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Média Atual</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {subjects.map((sub) => (
              <tr 
                key={sub.id} 
                className="hover:bg-slate-50/30 dark:hover:bg-white/1 transition-colors cursor-pointer group"
                onClick={() => navigate(`/aluno/notas/${sub.id}`)}
              >
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{sub.name}</p>
                  <p className="text-[11px] font-medium text-slate-400">{sub.prof}</p>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-sm font-black text-primary">{sub.avg}</span>
                </td>
                <td className="px-8 py-6 text-center">
                   <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                     sub.status === 'Aprovado' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                   }`}>
                     {sub.status}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                   <button className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-400 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">chevron_right</span>
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AlunoNotas;
