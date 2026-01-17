
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import Dashboard from './pages/admin-escola/dashboard.tsx';
import Usuarios from './pages/admin-escola/usuarios.tsx';
import Estrutura from './pages/admin-escola/estrutura.tsx';
import PlanoAssinatura from './pages/admin-escola/plano-assinatura.tsx';
import Auditoria from './pages/admin-escola/auditoria.tsx';
import Alocacoes from './pages/admin-escola/alocacoes.tsx';
import Comunicados from './pages/admin-escola/comunicados.tsx';
import Configuracoes from './pages/admin-escola/configuracoes.tsx';

// Professor Pages
import ProfessorDashboard from './pages/professor/dashboard.tsx';
import ProfessorTurmas from './pages/professor/turmas.tsx';
import ProfessorTurmaDetalhe from './pages/professor/turma-detalhe.tsx';
import ProfessorAvaliacoes from './pages/professor/avaliacoes.tsx';
import ProfessorNotas from './pages/professor/notas-lancamento.tsx';
import ProfessorEnvios from './pages/professor/envios.tsx';
import ProfessorEnvioDetalhe from './pages/professor/envio-detalhe.tsx';
import ProfessorComunicacao from './pages/professor/comunicacao.tsx';
import ProfessorConta from './pages/professor/conta.tsx';

// Aluno Pages
import AlunoDashboard from './pages/aluno/dashboard.tsx';
import AlunoDisciplinas from './pages/aluno/disciplinas.tsx';
import AlunoDisciplinaDetalhe from './pages/aluno/disciplina-detalhe.tsx';
import AlunoNotas from './pages/aluno/notas.tsx';
import AlunoNotasDetalhe from './pages/aluno/notas-detalhe.tsx';
import AlunoBoletim from './pages/aluno/boletim.tsx';
import AlunoComunicacao from './pages/aluno/comunicacao.tsx';
import AlunoConta from './pages/aluno/conta.tsx';

// BackOffice Pages
import BODashboard from './pages/backoffice/Dashboard.tsx';
import BOEscolas from './pages/backoffice/Escolas.tsx';
import BOEscolaDetalhe from './pages/backoffice/EscolaDetalhe.tsx';
import BOPlanos from './pages/backoffice/Planos.tsx';
import BOAssinaturas from './pages/backoffice/Assinaturas.tsx';
import BOPagamentos from './pages/backoffice/Pagamentos.tsx';
import BOPagamentoDetalhe from './pages/backoffice/PagamentoDetalhe.tsx';
import BOConectores from './pages/backoffice/Conectores.tsx';
import BOAuditoria from './pages/backoffice/Auditoria.tsx';
import BOSuporte from './pages/backoffice/Suporte.tsx';
import BOConfiguracoes from './pages/backoffice/Configuracoes.tsx';

import CoordinationDashboard from './pages/CoordinationDashboard.tsx';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* BackOffice (Global Admin) Routes */}
        <Route path="/backoffice/dashboard" element={<BODashboard />} />
        <Route path="/backoffice/escolas" element={<BOEscolas />} />
        <Route path="/backoffice/escolas/:schoolId" element={<BOEscolaDetalhe />} />
        <Route path="/backoffice/planos" element={<BOPlanos />} />
        <Route path="/backoffice/assinaturas" element={<BOAssinaturas />} />
        <Route path="/backoffice/pagamentos" element={<BOPagamentos />} />
        <Route path="/backoffice/pagamentos/:paymentId" element={<BOPagamentoDetalhe />} />
        <Route path="/backoffice/conectores" element={<BOConectores />} />
        <Route path="/backoffice/auditoria" element={<BOAuditoria />} />
        <Route path="/backoffice/suporte" element={<BOSuporte />} />
        <Route path="/backoffice/configuracoes" element={<BOConfiguracoes />} />

        {/* Admin Escola Routes */}
        <Route path="/admin-escola/dashboard" element={<Dashboard />} />
        <Route path="/admin-escola/usuarios" element={<Usuarios />} />
        <Route path="/admin-escola/estrutura" element={<Estrutura />} />
        <Route path="/admin-escola/alocacoes" element={<Alocacoes />} />
        <Route path="/admin-escola/plano-assinatura" element={<PlanoAssinatura />} />
        <Route path="/admin-escola/comunicados" element={<Comunicados />} />
        <Route path="/admin-escola/auditoria" element={<Auditoria />} />
        <Route path="/admin-escola/configuracoes" element={<Configuracoes />} />

        {/* Professor Routes */}
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/professor/turmas" element={<ProfessorTurmas />} />
        <Route path="/professor/turmas/:id" element={<ProfessorTurmaDetalhe />} />
        <Route path="/professor/avaliacoes" element={<ProfessorAvaliacoes />} />
        <Route path="/professor/notas" element={<ProfessorNotas />} />
        {/* Standardized path for Submissions */}
        <Route path="/professor/envios" element={<ProfessorEnvios />} />
        <Route path="/professor/envios-aprovacao" element={<ProfessorEnvios />} />
        <Route path="/professor/envios/:id" element={<ProfessorEnvioDetalhe />} />
        <Route path="/professor/comunicacao" element={<ProfessorComunicacao />} />
        <Route path="/professor/conta" element={<ProfessorConta />} />

        {/* Aluno Routes */}
        <Route path="/aluno/dashboard" element={<AlunoDashboard />} />
        <Route path="/aluno/disciplinas" element={<AlunoDisciplinas />} />
        <Route path="/aluno/disciplinas/:subjectId" element={<AlunoDisciplinaDetalhe />} />
        <Route path="/aluno/notas" element={<AlunoNotas />} />
        <Route path="/aluno/notas/:disciplineId" element={<AlunoNotasDetalhe />} />
        <Route path="/aluno/boletim" element={<AlunoBoletim />} />
        <Route path="/aluno/comunicacao" element={<AlunoComunicacao />} />
        <Route path="/aluno/conta" element={<AlunoConta />} />

        {/* Coordination Routes */}
        <Route path="/coordination" element={<CoordinationDashboard />} />
        
        {/* Home Redirect to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
