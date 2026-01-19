
import React, { useState } from 'react';
import { User, Target, Bell, Globe, Plus, Trash2, Shield, Mail, X, Lock, Eye, EyeOff } from 'lucide-react';
import { MOCK_OBJECTIVES } from '../../../src/constants';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer' | 'editor';
}

const Settings: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([
    { id: '1', name: 'João da Silva', email: 'joao.silva@exemplo.com', role: 'admin' },
    { id: '2', name: 'Maria Souza', email: 'maria.souza@exemplo.com', role: 'editor' }
  ]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'viewer' as 'admin' | 'viewer' | 'editor' 
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) return;
    
    const user: UserItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', password: '', role: 'viewer' });
    setShowUserModal(false);
    setShowPassword(false);
  };

  const removeUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <header>
        <h1 className="text-3xl font-bold text-emerald-900">Configurações</h1>
        <p className="text-emerald-600">Gerencie seu perfil, usuários e preferências do ecossistema</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile & Objectives Section */}
          <section className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-emerald-50">
              <div className="w-24 h-24 bg-emerald-600 rounded-[2rem] shadow-lg shadow-emerald-100 flex items-center justify-center text-white text-4xl font-black shrink-0">
                JD
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-black text-emerald-900">João da Silva</h2>
                <p className="text-emerald-600 font-medium">joao.silva@exemplo.com</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">Conta Premium</span>
                  <button className="text-emerald-600 text-sm font-bold hover:underline ml-2">Editar Perfil</button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                  <Target className="text-emerald-500" size={24} />
                  Meus Objetivos
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_OBJECTIVES.map(obj => (
                  <div key={obj.id} className="group flex items-center justify-between p-5 bg-emerald-50/50 rounded-3xl border border-emerald-100 hover:bg-emerald-50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <Target size={20} />
                      </div>
                      <span className="font-bold text-emerald-900">{obj.name}</span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2 text-red-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                <button className="flex items-center justify-center gap-2 p-5 border-2 border-dashed border-emerald-200 rounded-3xl text-emerald-600 font-bold hover:bg-emerald-50 hover:border-emerald-300 transition-all">
                  <Plus size={20} />
                  Novo Objetivo
                </button>
              </div>
            </div>
          </section>

          {/* User Management Section */}
          <section className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                <User className="text-emerald-500" size={24} />
                Gerenciar Usuários
              </h3>
              <button 
                onClick={() => setShowUserModal(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-emerald-50"
              >
                <Plus size={18} />
                Adicionar Usuário
              </button>
            </div>

            <div className="space-y-3">
              {users.map(u => (
                <div key={u.id} className="flex items-center justify-between p-4 bg-white border border-emerald-50 rounded-2xl hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-emerald-900">{u.name}</p>
                      <p className="text-xs text-emerald-500">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg ${
                      u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 
                      u.role === 'editor' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {u.role}
                    </span>
                    {u.id !== '1' && (
                      <button 
                        onClick={() => removeUser(u.id)}
                        className="p-2 text-red-200 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Settings (Prefereces) */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2 mb-6">
              <Globe className="text-emerald-500" size={20} />
              Regional e Moeda
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-emerald-400 uppercase block mb-2 px-1">Moeda Principal</label>
                <select className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-4 py-3 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                  <option value="BRL">Real (BRL) - 🇧🇷</option>
                  <option value="USD">Dólar (USD) - 🇺🇸</option>
                  <option value="EUR">Euro (EUR) - 🇪🇺</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-emerald-400 uppercase block mb-2 px-1">Idioma</label>
                <select className="w-full bg-emerald-50/50 border border-emerald-100 rounded-2xl px-4 py-3 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
                  <option value="pt">Português (Brasil)</option>
                  <option value="en">English (US)</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
            <h3 className="text-lg font-bold text-emerald-900 flex items-center gap-2 mb-6">
              <Bell className="text-emerald-500" size={20} />
              Notificações
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-emerald-900 group-hover:text-emerald-600 transition-colors">Alertas de Prazos</span>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </div>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-emerald-900 group-hover:text-emerald-600 transition-colors">Sugestões da IA</span>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </div>
              </label>
            </div>
          </section>
        </div>
      </div>

      {/* Add User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="bg-emerald-600 p-8 flex justify-between items-center text-white sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">Novo Usuário</h2>
                <p className="text-emerald-100 text-sm">Convide um colaborador para o ecossistema</p>
              </div>
              <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-8 space-y-5">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Maria Clara"
                      value={newUser.name}
                      onChange={e => setNewUser({...newUser, name: e.target.value})}
                      className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-12 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-emerald-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="email@exemplo.com"
                      value={newUser.email}
                      onChange={e => setNewUser({...newUser, email: e.target.value})}
                      className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-12 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-emerald-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">Senha Inicial</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      placeholder="••••••••"
                      value={newUser.password}
                      onChange={e => setNewUser({...newUser, password: e.target.value})}
                      className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-12 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-emerald-200"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-emerald-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">Papel / Acesso</label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
                    <select 
                      value={newUser.role}
                      onChange={e => setNewUser({...newUser, role: e.target.value as any})}
                      className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-12 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                    >
                      <option value="viewer">Visualizador (Apenas vê)</option>
                      <option value="editor">Editor (Adiciona dados)</option>
                      <option value="admin">Administrador (Controle total)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
                >
                  Convidar e Salvar
                </button>
                <p className="text-[10px] text-emerald-400 text-center mt-4 uppercase font-bold tracking-widest">
                  O usuário receberá os dados por e-mail
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
