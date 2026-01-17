
import React, { useState } from 'react';
import Layout from '../components/Layout.tsx';
import { UserRole } from '../types.ts';
import { useNavigate } from 'react-router-dom';

const ReportCardPage: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const subjects = [
    { name: 'Matemática Avançada', prof: 'Prof. Ricardo Mendes', evaluations: { p1: '8.5', p2: '9.0', t1: '10.0' }, avg: '9.2', attendance: '98%', status: 'Aprovado' },
    { name: 'Língua Portuguesa e Literatura', prof: 'Profa. Maria Helena', evaluations: { p1: '7.0', p2: '6.5', t1: '-' }, avg: '6.8', attendance: '92%', status: 'Em andamento' },
    { name: 'Física Quântica', prof: 'Prof. Alberto Rocha', evaluations: { p1: '9.5', p2: '8.0', t1: '9.0' }, avg: '8.8', attendance: '100%', status: 'Aprovado' },
    { name: 'História Geral', prof: 'Profa. Ana Claudia', evaluations: { p1: '8.0', p2: '7.5', t1: '8.5' }, avg: '8.0', attendance: '95%', status: 'Aprovado' },
  ];

  return (
    <Layout role={UserRole.STUDENT}>
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
          <span>Home</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-bold">Boletim</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Boletim - 2º Trimestre</h1>
            <p className="text-slate-500 font-medium">Visão consolidada do desempenho acadêmico em 2023</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-[#18c7cd] text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:opacity-90">
              <span className="material-symbols-outlined">download</span> Baixar PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm rounded-xl">
              <span className="material-symbols-outlined">print</span> Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
            <div className="flex gap-8">
              <button className="pb-4 text-sm font-black text-primary border-b-2 border-primary">Visão Consolidada</button>
              <button className="pb-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Histórico Completo</button>
            </div>
            <div className="flex gap-4">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase">Ano Letivo</p>
                <div className="bg-slate-50 dark:bg-white/5 px-4 py-1.5 rounded-lg text-sm font-bold">2023</div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase">Período</p>
                <div className="bg-slate-50 dark:bg-white/5 px-4 py-1.5 rounded-lg text-sm font-bold">2º Trimestre</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disciplina</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Avaliações</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Média</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Frequência</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {subjects.map((sub, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-white/1 cursor-pointer" onClick={() => navigate('/student/grades')}>
                    <td className="py-6">
                      <p className="text-sm font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors">{sub.name}</p>
                      <p className="text-[11px] font-medium text-slate-400">{sub.prof}</p>
                    </td>
                    <td className="py-6">
                      <div className="flex justify-center gap-2">
                        <div className="bg-slate-100/50 dark:bg-white/5 px-2 py-1 rounded text-[10px] font-bold"><span className="text-slate-400">P1:</span> {sub.evaluations.p1}</div>
                        <div className="bg-slate-100/50 dark:bg-white/5 px-2 py-1 rounded text-[10px] font-bold"><span className="text-slate-400">P2:</span> {sub.evaluations.p2}</div>
                        <div className="bg-slate-100/50 dark:bg-white/5 px-2 py-1 rounded text-[10px] font-bold"><span className="text-slate-400 italic">T1:</span> {sub.evaluations.t1}</div>
                      </div>
                    </td>
                    <td className="py-6 text-center text-sm font-black text-primary">{sub.avg}</td>
                    <td className="py-6 text-center text-sm font-bold">{sub.attendance}</td>
                    <td className="py-6 text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        sub.status === 'Aprovado' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        • {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Observations */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">chat_bubble</span>
          </div>
          <h3 className="text-lg font-black tracking-tight">Observações Gerais</h3>
        </div>
        <div className="bg-slate-50 dark:bg-white/2 rounded-2xl p-8 border-l-4 border-primary">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic leading-relaxed mb-4">
            "O aluno demonstrou excelente desempenho em disciplinas exatas, superando as metas do trimestre. Notamos um engajamento significativo nas aulas de Física Quântica. Recomenda-se manter o foco em leitura literária para o próximo período."
          </p>
          <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-widest">
            <span>Coordenação Pedagógica</span>
            <span>22 de Junho, 2023</span>
          </div>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="size-16 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600">
            <span className="material-symbols-outlined text-4xl">school</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Média Geral</p>
            <h4 className="text-4xl font-black">8.2</h4>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="size-16 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
            <span className="material-symbols-outlined text-4xl">event_available</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frequência Global</p>
            <h4 className="text-4xl font-black">96%</h4>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div className="size-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined text-4xl">inventory_2</span>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pendências</p>
            <h4 className="text-4xl font-black">0</h4>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs font-bold text-slate-400">© 2023 Sistema de Gestão Acadêmica. Todos os direitos reservados.</p>
      </footer>

      {/* Download Modal Mockup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-black">Baixar PDF</h3>
                  <p className="text-sm font-medium text-slate-500 mt-1">Selecione as opções para personalizar seu boletim.</p>
                </div>
                <button onClick={() => setShowModal(false)} className="size-10 rounded-full hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black">Incluir observações do docente</p>
                    <p className="text-xs text-slate-400 font-medium">Exibe comentários pedagógicos ao final do boletim.</p>
                  </div>
                  <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="size-6 bg-primary rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black">Incluir anexos</p>
                      <span className="px-2 py-0.5 bg-slate-100 text-[8px] font-black rounded uppercase">Stub</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Disponível em breve para documentos externos.</p>
                  </div>
                  <div className="size-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                    <div className="size-6 bg-slate-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button onClick={() => setShowModal(false)} className="flex-1 py-4 font-black text-sm text-slate-500">Cancelar</button>
                <button className="flex-1 py-4 bg-primary text-white rounded-xl font-black text-sm shadow-lg shadow-primary/20">Gerar PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ReportCardPage;
