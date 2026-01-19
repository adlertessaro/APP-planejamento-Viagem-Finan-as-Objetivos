
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  FileText, 
  Target, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  selectedObjectiveName: string | null;
  onClearObjective: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, selectedObjectiveName, onClearObjective, onLogout }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/finance', icon: <Wallet size={20} />, label: 'Financeiro' },
    { path: '/objectives', icon: <Target size={20} />, label: 'Objetivo' },
    { path: '/documents', icon: <FileText size={20} />, label: 'Documentos' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Ajustes' },
  ];

  return (
    <div className="flex h-screen bg-emerald-50/30 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-emerald-100 flex flex-col shadow-sm transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header / Logo */}
        <div className={`p-6 border-b border-emerald-100 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">F</div>
              <span className="text-xl font-bold text-emerald-900 truncate">FinGoal</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">F</div>
          )}
        </div>

        {/* Objective Context Info */}
        {selectedObjectiveName && !isCollapsed && (
          <div className="px-6 py-4 border-b border-emerald-50 bg-emerald-50/50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Objetivo Atual</span>
              <button 
                onClick={onClearObjective}
                className="text-emerald-400 hover:text-emerald-600 transition-colors"
                title="Trocar Objetivo"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
            <p className="text-sm font-medium text-emerald-900 truncate">{selectedObjectiveName}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.label : ''}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                    : 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <span className="shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="font-medium truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Toggle & Logout */}
        <div className="p-3 space-y-2 border-t border-emerald-100">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-3 px-3 py-3 w-full text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors font-medium group"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!isCollapsed && <span>Recolher Menu</span>}
          </button>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
