
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';

const ProfessorNotas: React.FC = () => {
  const [alunos, setAlunos] = useState([
    { id: '1', ra: '2024001', name: 'Alexandre Mendonça', grade: '8.5', obs: 'Excelente' },
    { id: '2', ra: '2024002', name: 'Beatriz Helena Santos', grade: '4.2', obs: 'Recuperação' },
    { id: '3', ra: '2024003', name: 'Carlos Eduardo Lima', grade: '', obs: '' },
    { id: '4', ra: '2024004', name: 'Daniela Martins', grade: '9.8', obs: 'Destaque' },
  ]);

  return (
    <Layout role={UserRole.PROFESSOR}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Lançamento de Notas</h1>
          <p className="text-muted-foreground font-medium mt-1">Insira e edite as notas dos alunos por avaliação.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-muted transition-all text-foreground">
              <span className="material-symbols-outlined text-xl">upload_file</span>
              Importar CSV
           </button>
        </div>
      </div>

      <div className="bg-card rounded-[32px] border border-border shadow-sm overflow-hidden mb-32">
        <div className="p-8 border-b border-border flex flex-wrap gap-6 items-center justify-between bg-muted/20">
           <div className="flex flex-wrap gap-8">
              <div className="space-y-1.5">
                 <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Turma Ativa</label>
                 <select className="bg-background border border-input rounded-xl py-2 px-4 text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 outline-none">
                    <option>9º Ano A - Matutino</option>
                 </select>
              </div>
              <div className="space-y-1.5">
                 <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Avaliação</label>
                 <select className="bg-background border border-input rounded-xl py-2 px-4 text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 outline-none">
                    <option>Prova Bimestral 1 (P1)</option>
                    <option>Trabalho Geometria</option>
                 </select>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Sincronização Ativa</p>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">RA</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Aluno</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-center">Nota (0-10)</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Observações</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-8 py-5 text-xs font-bold text-muted-foreground uppercase">{aluno.ra}</td>
                  <td className="px-8 py-5 font-black text-sm text-foreground">{aluno.name}</td>
                  <td className="px-8 py-5">
                     <input 
                      type="text" 
                      defaultValue={aluno.grade} 
                      placeholder="-"
                      className="w-16 h-11 mx-auto block bg-background border border-input rounded-xl text-center font-black text-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                     />
                  </td>
                  <td className="px-8 py-5">
                     <input 
                      type="text" 
                      defaultValue={aluno.obs} 
                      placeholder="Adicionar nota..."
                      className="w-full max-w-xs bg-background border border-input rounded-xl py-3 px-4 text-xs text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                     />
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="material-symbols-outlined text-muted-foreground hover:text-primary transition-colors">history</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-0 left-64 right-0 p-6 bg-background/90 backdrop-blur-xl border-t border-border flex items-center justify-between z-40 shadow-xl">
         <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="size-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" className="size-full object-cover grayscale opacity-50" />
                 </div>
               ))}
               <div className="size-8 rounded-full border-2 border-background bg-primary/10 text-primary text-[10px] font-black flex items-center justify-center">+28</div>
            </div>
            <p className="text-xs font-bold text-muted-foreground tracking-tight">4 de 32 alunos com notas lançadas</p>
         </div>
         <div className="flex gap-4">
            <button className="px-8 py-3.5 text-xs font-black uppercase text-muted-foreground hover:text-foreground transition-colors tracking-widest">Salvar Rascunho</button>
            <button className="px-10 py-3.5 bg-emerald-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-3">
                <span className="material-symbols-outlined">send</span>
                Enviar para Aprovação
            </button>
         </div>
      </div>
    </Layout>
  );
};

export default ProfessorNotas;
