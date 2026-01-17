
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { useNavigate } from 'react-router-dom';

const AlunoBoletim: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const subjects = [
    { name: 'Matemática Avançada', prof: 'Prof. Ricardo Mendes', avg: '9.2', status: 'Aprovado' },
    { name: 'Língua Portuguesa', prof: 'Profa. Maria Helena', avg: '6.8', status: 'Cursando' },
    { name: 'Física Quântica', prof: 'Prof. Alberto Rocha', avg: '8.8', status: 'Aprovado' },
    { name: 'História Geral', prof: 'Profa. Ana Claudia', avg: '8.0', status: 'Aprovado' },
  ];

  return (
    <Layout role={UserRole.STUDENT}>
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">
          <button onClick={() => navigate('/aluno/dashboard')} className="hover:text-primary">Início</button>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-white">Boletim Oficial</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Boletim Escolar</h1>
            <p className="text-slate-500 font-medium">Situação consolidada para o Período Letivo 2024.1</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all">
              <span className="material-symbols-outlined text-xl">download</span> 
              Baixar PDF
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-12">
        <div className="p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 border-b border-slate-50 dark:border-white/5 pb-10">
            <div className="flex gap-10">
              <button className="text-sm font-black text-primary border-b-2 border-primary pb-2">2024.1 (Atual)</button>
              <button className="text-sm font-black text-slate-400 hover:text-slate-600 pb-2 transition-all">2023.2</button>
              <button className="text-sm font-black text-slate-400 hover:text-slate-600 pb-2 transition-all">Histórico Completo</button>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-2xl">
               <span className="material-symbols-outlined text-primary">verified_user</span>
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Documento Assinado</p>
                  <p className="text-xs font-black">Certificado pela Instituição</p>
               </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disciplina</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Média Final</th>
                  <th className="pb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {subjects.map((sub, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-white/1 cursor-pointer" onClick={() => navigate(`/aluno/notas/${sub.name.toLowerCase()}`)}>
                    <td className="py-8">
                      <p className="text-base font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{sub.name}</p>
                      <p className="text-xs font-medium text-slate-400">{sub.prof}</p>
                    </td>
                    <td className="py-8 text-center text-xl font-black text-primary">{sub.avg}</td>
                    <td className="py-8 text-right">
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        sub.status === 'Aprovado' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-12 text-center">
              <div className="size-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">picture_as_pdf</span>
              </div>
              <h3 className="text-2xl font-black mb-2">Exportar Boletim</h3>
              <p className="text-sm font-medium text-slate-500 mb-10 leading-relaxed">O arquivo PDF será gerado com a assinatura digital da coordenação e selo da unidade.</p>
              
              <div className="flex gap-4">
                <button onClick={() => setShowModal(false)} className="flex-1 py-4 font-black text-xs uppercase text-slate-400">Cancelar</button>
                <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">Gerar Documento</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AlunoBoletim;
