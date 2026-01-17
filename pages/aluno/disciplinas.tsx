
import React, { useState } from 'react';
import Layout from '../../components/Layout.tsx';
import { UserRole } from '../../types.ts';
import { useNavigate } from 'react-router-dom';
import { studentMocks } from '../../data/studentMocks.ts';
import PlatformCard from '../../components/ui/PlatformCard.tsx';

const AlunoDisciplinas: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = studentMocks.subjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout role={UserRole.STUDENT}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight">Minhas Disciplinas</h1>
          <p className="text-muted-foreground font-medium mt-1">Acompanhe seu desempenho acadêmico e materiais em cada matéria.</p>
        </div>
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
          <input 
            type="text" 
            placeholder="Buscar disciplina..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSubjects.map((subject) => (
          <PlatformCard
            key={subject.id}
            title={subject.name}
            subtitle={`${subject.teacher} • ${subject.code}`}
            icon={subject.icon}
            iconBgColor={subject.color}
            href={`/aluno/disciplinas/${subject.id}`}
            actionLabel="Gerenciar Disciplina"
            meta={[
                { label: 'FREQUÊNCIA', value: `${subject.attendance}%` },
                { label: 'STATUS', value: 'EM CURSO' }
            ]}
          >
            <div className="mb-6 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Média Parcial</span>
                  <span className="text-xs font-black text-primary">{subject.grade}</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${subject.grade >= 7 ? 'bg-primary' : 'bg-amber-400'}`} 
                    style={{ width: `${(subject.grade / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </PlatformCard>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
          <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
          <p className="text-lg font-black uppercase tracking-widest text-muted-foreground">Nenhuma disciplina encontrada</p>
        </div>
      )}

      <footer className="mt-20 text-center py-8 border-t border-border">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">© 2024 AcademiaSaaS • Portal do Aluno</p>
      </footer>
    </Layout>
  );
};

export default AlunoDisciplinas;
