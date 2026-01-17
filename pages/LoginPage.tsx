
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Simulação de delay de rede
    setTimeout(() => {
      const lowerEmail = email.toLowerCase();
      
      // Lógica de Redirecionamento Baseada em Perfil
      if (lowerEmail.includes('backoffice')) {
        navigate('/backoffice/dashboard');
      } else if (lowerEmail.includes('admin')) {
        navigate('/admin-escola/dashboard');
      } else if (lowerEmail.includes('prof')) {
        navigate('/professor/dashboard');
      } else if (lowerEmail.includes('coord')) {
        navigate('/coordination');
      } else if (lowerEmail.includes('aluno') || lowerEmail.includes('student')) {
        navigate('/aluno/dashboard');
      } else {
        // Padrão seguro definido no PRD
        navigate('/aluno/dashboard');
      }
      setLoading(false);
    }, 1200);
  };

  const handleQuickAccess = (profileEmail: string) => {
    setEmail(profileEmail);
    setPassword('********');
    setError('');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-6 transition-colors duration-500 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-[#1a2b2b] rounded-[40px] p-12 shadow-2xl border border-slate-100 dark:border-white/5 text-center relative overflow-hidden">
        
        {/* Elemento Decorativo (Glow) */}
        <div className="absolute -top-24 -right-24 size-48 bg-primary/10 rounded-full blur-3xl"></div>
        
        {/* Logo/Ícone */}
        <div className="size-20 bg-primary rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-primary/30 relative z-10 animate-in zoom-in-50 duration-500">
          <span className="material-symbols-outlined text-5xl font-black">hub</span>
        </div>
        
        <div className="mb-10 relative z-10">
          <h1 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Portal Acadêmico</h1>
          <p className="text-[#638788] font-semibold text-sm italic">Acesse sua unidade institucional</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6 text-left relative z-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-black uppercase px-4 py-2 rounded-xl text-center animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">E-mail Institucional</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">alternate_email</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu-email@escola.com"
                className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl py-4 pl-12 pr-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Senha de Acesso</label>
              <button type="button" className="text-[10px] font-black text-primary uppercase hover:underline">Esqueci a senha</button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl py-4 pl-12 pr-5 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-primary text-white py-4.5 rounded-2xl font-black text-sm shadow-xl shadow-primary/25 hover:scale-[1.02] hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group ${loading ? 'opacity-80 cursor-wait' : ''}`}
            >
              {loading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Entrar no Sistema</span>
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">login</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/5">
          <p className="text-[9px] uppercase font-black text-slate-400 tracking-[0.3em] mb-6">Acesso Rápido por Perfil</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <button 
              type="button" 
              onClick={() => handleQuickAccess('aluno@escola.com')}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all border ${email.includes('aluno') ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-400 hover:text-primary hover:bg-primary/5'}`}
            >
              Sou Aluno
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickAccess('professor@escola.com')}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all border ${email.includes('prof') ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-400 hover:text-primary hover:bg-primary/5'}`}
            >
              Sou Professor
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickAccess('admin@escola.com')}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all border ${(email.includes('admin') && !email.includes('backoffice')) ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-400 hover:text-primary hover:bg-primary/5'}`}
            >
              Sou Admin Escola
            </button>
            <button 
              type="button" 
              onClick={() => handleQuickAccess('backoffice@global.com')}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all border ${email.includes('backoffice') ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/5'}`}
            >
              Sou BackOffice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
