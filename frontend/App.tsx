
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './src/components/Layout';
import Login from './src/pages/Login';
import GoalSelection from './src/pages/GoalSelection';
import Dashboard from './src/pages/Dashboard';
import Finance from './src/pages/Finance';
import Objectives from './src/pages/Objectives';
import Documents from './src/pages/Documents';
import Settings from './src/pages/Settings';
import { Objective } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Carrega o estado inicial do localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem('is_logged_in');
    const savedObjective = localStorage.getItem('selected_objective');
    
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }
    
    if (savedObjective) {
      try {
        setSelectedObjective(JSON.parse(savedObjective));
      } catch (e) {
        console.error("Erro ao carregar objetivo salvo", e);
      }
    }
    
    setIsInitializing(false);
  }, []);

  const handleLogin = useCallback(() => {
    console.log("Executando handleLogin");
    setIsLoggedIn(true);
    localStorage.setItem('is_logged_in', 'true');
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setSelectedObjective(null);
    localStorage.removeItem('is_logged_in');
    localStorage.removeItem('selected_objective');
  }, []);

  const handleSelectObjective = (objective: Objective) => {
    setSelectedObjective(objective);
    localStorage.setItem('selected_objective', JSON.stringify(objective));
  };

  const handleClearObjective = () => {
    setSelectedObjective(null);
    localStorage.removeItem('selected_objective');
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Se não estiver logado, mostra tela de login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Se logado mas sem objetivo, mostra seleção de contexto
  if (!selectedObjective) {
    return <GoalSelection onSelect={handleSelectObjective} />;
  }

  // Se logado e com objetivo, mostra o sistema principal
  return (
    <HashRouter>
      <Layout 
        selectedObjectiveName={selectedObjective.name} 
        onClearObjective={handleClearObjective}
        // Fix: passing handleLogout callback instead of the boolean isLoggedIn state to satisfy the () => void type requirement
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={<Dashboard objective={selectedObjective} />} />
          <Route path="/finance" element={<Finance objective={selectedObjective} />} />
          <Route path="/objectives" element={<Objectives objective={selectedObjective} />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
