
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulação de validação (Em um app real, isso seria via API/Supabase)
    setTimeout(() => {
      if (email === 'admin@fingoal.com' && password === 'admin123') {
        onLogin();
      } else {
        setError('E-mail ou senha inválidos. Tente admin@fingoal.com / admin123');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-[2rem] shadow-xl shadow-emerald-200 text-white font-black text-3xl mb-4 animate-bounce">
            F
          </div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tight">FinGoal Ecosystem</h1>
          <p className="text-emerald-600 font-medium">Seu futuro planejado em cada centavo.</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-100/50 p-8 md:p-10 border border-emerald-100 overflow-hidden relative">
          {/* Decorative element */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-50 rounded-full"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="text-red-500 shrink-0" size={20} />
                <p className="text-xs font-bold text-red-600 leading-tight">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block tracking-widest">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={20} />
                  <input 
                    type="email" 
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-12 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all placeholder:text-emerald-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center ml-2 mb-1">
                  <label className="text-xs font-bold text-emerald-400 uppercase block tracking-widest">Senha</label>
                  <button type="button" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 uppercase tracking-widest">Esqueceu?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-12 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all placeholder:text-emerald-200"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-emerald-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <input type="checkbox" id="remember" className="rounded border-emerald-200 text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
              <label htmlFor="remember" className="text-xs font-bold text-emerald-400 cursor-pointer select-none uppercase tracking-tighter">Manter conectado</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Entrar no Ecossistema
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-emerald-50 text-center">
            <p className="text-sm text-emerald-400 font-medium">
              Acesso de teste: <span className="text-emerald-600 font-bold">admin@fingoal.com / admin123</span>
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-emerald-300">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Conexão Segura AES-256</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
