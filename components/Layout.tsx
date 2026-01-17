
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserRole, NavLinkItem } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  impersonatingSchool?: string;
}

interface NavGroup {
  group: string;
  items: NavLinkItem[];
}

const Sidebar: React.FC<{ role: UserRole }> = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const boLinks: NavGroup[] = [
    { group: "VISÃO GERAL", items: [{ path: "/backoffice/dashboard", label: "Dashboard", icon: "insights" }] },
    { group: "TENANTS", items: [{ path: "/backoffice/escolas", label: "Escolas", icon: "corporate_fare" }] },
    { group: "FATURAMENTO", items: [{ path: "/backoffice/planos", label: "Planos e Preços", icon: "loyalty" }] },
    { group: "TÉCNICO", items: [
      { path: "/backoffice/auditoria", label: "Auditoria Global", icon: "policy" },
      { path: "/backoffice/suporte", label: "Central de Suporte", icon: "support_agent" }
    ]},
    { group: "EXTRAS (BETA)", items: [
      { path: "/backoffice/assinaturas", label: "Assinaturas", icon: "history" },
      { path: "/backoffice/pagamentos", label: "Transações", icon: "payments" },
      { path: "/backoffice/conectores", label: "Gateways e Webhooks", icon: "api" },
      { path: "/backoffice/configuracoes", label: "Config. Globais", icon: "settings_suggest" }
    ]}
  ];

  const studentLinks: NavLinkItem[] = [
    { path: "/aluno/dashboard", label: "Dashboard", icon: "dashboard" },
    { path: "/aluno/disciplinas", label: "Disciplinas", icon: "book_4" },
    { path: "/aluno/boletim", label: "Boletim Oficial", icon: "description" },
    { path: "/aluno/comunicacao", label: "Comunicação", icon: "forum" },
    { path: "/aluno/conta", label: "Minha Conta", icon: "person" }
  ];

  const otherLinks: Record<string, NavLinkItem[]> = {
    [UserRole.ADMIN]: [
      { path: "/admin-escola/dashboard", label: "Dashboard", icon: "dashboard" },
      { path: "/admin-escola/usuarios", label: "Usuários", icon: "group" },
      { path: "/admin-escola/estrutura", label: "Estrutura", icon: "account_tree" },
      { path: "/admin-escola/alocacoes", label: "Alocações", icon: "event_available" },
      { path: "/admin-escola/plano-assinatura", label: "Plano", icon: "workspace_premium" },
      { path: "/admin-escola/comunicados", label: "Comunicação", icon: "campaign" },
      { path: "/admin-escola/auditoria", label: "Auditoria", icon: "policy" },
      { path: "/admin-escola/configuracoes", label: "Configurações", icon: "settings" }
    ],
    [UserRole.PROFESSOR]: [
      { path: "/professor/dashboard", label: "Dashboard", icon: "dashboard" },
      { path: "/professor/turmas", label: "Minhas Turmas", icon: "school" },
      { path: "/professor/avaliacoes", label: "Avaliações", icon: "assignment" },
      { path: "/professor/notas", label: "Lançamento de Notas", icon: "edit_note" },
      { path: "/professor/envios", label: "Envios para Aprovação", icon: "task_alt" },
      { path: "/professor/comunicacao", label: "Comunicação", icon: "campaign" },
      { path: "/professor/conta", label: "Conta", icon: "person" }
    ]
  };

  const isActive = (path: string) => {
    if (location.pathname === path) return true;
    if (path !== "/aluno/dashboard" && path !== "/backoffice/dashboard" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getBranding = () => {
    if (role === UserRole.BACKOFFICE) return { title: "AcademiaSaaS", sub: "BackOffice v1.2" };
    if (role === UserRole.STUDENT) return { title: "AcademiaSaaS", sub: "Área do Aluno" };
    return { title: "AcademiaSaaS", sub: "Gestão Unidade" };
  };

  const branding = getBranding();

  return (
    <aside className="w-64 border-r border-border bg-card h-screen flex flex-col shrink-0 overflow-hidden">
      <div className="p-6 shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary/10 rounded-xl p-2 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <span className="material-symbols-outlined text-primary text-2xl font-black group-hover:text-primary-foreground">hub</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-foreground text-base font-black leading-none uppercase tracking-tighter">{branding.title}</h1>
            <p className="text-muted-foreground text-[9px] font-black uppercase tracking-widest mt-1">{branding.sub}</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-6 custom-scrollbar pb-10 pt-4">
        {role === UserRole.BACKOFFICE ? (
          boLinks.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <p className="px-3 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">{group.group}</p>
              {group.items.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive(link.path) ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted font-bold'}`}
                >
                  <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  <p className="text-xs font-bold">{link.label}</p>
                </Link>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-1">
            {(role === UserRole.STUDENT ? studentLinks : otherLinks[role])?.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive(link.path) ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-muted font-bold'}`}
              >
                <span className="material-symbols-outlined text-[22px]">{link.icon}</span>
                <p className="text-sm font-bold">{link.label}</p>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-border shrink-0 bg-card">
        <button 
          onClick={() => navigate('/login')} 
          className="w-full flex items-center gap-3 px-4 py-3 text-destructive font-black text-sm hover:bg-destructive/10 rounded-2xl transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span>Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
};

const Header: React.FC<{ role: UserRole }> = ({ role }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const getUserName = () => {
    switch(role) {
      case UserRole.STUDENT: return "Lucas Silva";
      case UserRole.PROFESSOR: return "Prof. Ricardo Silveira";
      case UserRole.BACKOFFICE: return "Super Admin";
      default: return "Administrador";
    }
  };

  return (
    <header className="h-18 flex items-center justify-between px-8 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-[50]">
      <div className="flex items-center gap-6">
        <div className="relative w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[20px]">search</span>
          <input className="w-full h-11 pl-10 pr-4 bg-muted border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground font-medium text-foreground" placeholder="Buscar no sistema..." type="text"/>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="size-10 flex items-center justify-center rounded-xl hover:bg-muted text-muted-foreground transition-all">
                <span className="material-symbols-outlined">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
            </button>
            <button className="size-10 flex items-center justify-center rounded-xl hover:bg-muted text-muted-foreground relative transition-all">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-card"></span>
            </button>
        </div>

        <div className="h-8 w-px bg-border mx-1"></div>

        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-foreground leading-none">{getUserName()}</p>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">SESSÃO: {role.toUpperCase()}</p>
            </div>
            
            <button className="size-10 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden ring-2 ring-primary/20">
                <img src={`https://i.pravatar.cc/150?u=${role}`} alt="Avatar" className="w-full h-full object-cover" />
            </button>
        </div>
      </div>
    </header>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, role, impersonatingSchool }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-y-auto relative custom-scrollbar">
        {impersonatingSchool && (
          <div className="bg-amber-500 py-3 px-8 flex items-center justify-between text-white font-black text-xs uppercase tracking-widest sticky top-0 z-[60] shadow-lg animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">visibility</span>
              MODO SUPORTE: VOCÊ ESTÁ ACESSANDO COMO ADMIN DA ESCOLA {impersonatingSchool.toUpperCase()}
            </div>
            <button className="bg-white/20 px-4 py-1.5 rounded-lg hover:bg-white/30 transition-all">Encerrar Sessão</button>
          </div>
        )}
        <Header role={role} />
        <main className="p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
