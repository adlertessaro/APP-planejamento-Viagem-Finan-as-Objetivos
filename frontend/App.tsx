
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './src/components/Layout';
import Login from './src/features/auth/Login';
import GoalSelection from './src/features/objetivos/GoalSelection';
import Dashboard from './src/features/dashboard/Dashboard';
import Finance from './src/features/financeiro/Finance';
import Objectives from './src/features/objetivos/Objectives';
import Documents from './src/features/documentos/Documents';
import Settings from './src/features/perfil/Settings';
import { Objective } from './src/types/types';
import { ObjetivoProvider, useObjetivoAtivo } from './src/context/ObjetivoContext';
import { supabase } from './src/api/supabase';

// Rota que verifica se um objetivo está selecionado

const RotaObjetivoProtegida = ({ children }: { children: React.ReactNode }) => {
  const { objetivoId } = useObjetivoAtivo();
  return objetivoId ? <>{children}</> : <Navigate to="/selecionar-objetivo" replace />;
};

// Rota que verifica se o usuário está logado

const RotaAutenticada = ({ children, loggedIn }: { children: React.ReactNode; loggedIn: boolean | null }) => {
  return loggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

// Função para checar se o usuário está logado

const isLoggedIn = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  return data.session !== null;
}

// App Component

function App() { 
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const checkLoginStatus = useCallback(async () => {
    const status = await isLoggedIn();
    setLoggedIn(status);
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }
, [checkLoginStatus]);

  useEffect(() => {
    const {data: { subscription }} = supabase.auth.onAuthStateChange((event, session) => {
      setLoggedIn(session !== null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

    const handleLogin = () => {
    setLoggedIn(true);
  };

    if (loggedIn === null) {
    return <div>Carregando...</div>;
  }

  return (
    <ObjetivoProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/selecionar-objetivo" element={<GoalSelection />} />

          <Route path="/dashboard" element={
            <RotaAutenticada loggedIn={loggedIn}>
              <RotaObjetivoProtegida>
                <Dashboard />
              </RotaObjetivoProtegida>
            </RotaAutenticada>
          } />
          <Route path="/financeiro" element={
            <RotaAutenticada loggedIn={loggedIn}>
              <RotaObjetivoProtegida>
                <Finance />
              </RotaObjetivoProtegida>
            </RotaAutenticada>
          } />
          <Route path="/objetivos" element={
            <RotaAutenticada loggedIn={loggedIn}>
              <RotaObjetivoProtegida>
                <Objectives />
              </RotaObjetivoProtegida>
            </RotaAutenticada>
          } />
          <Route path="/documentos" element={
            <RotaAutenticada loggedIn={loggedIn}>
              <RotaObjetivoProtegida>
                <Documents />
              </RotaObjetivoProtegida>
            </RotaAutenticada>
          } />
          <Route path="/configuracoes" element={
            <RotaAutenticada loggedIn={loggedIn}>
              <RotaObjetivoProtegida>
                <Settings />
              </RotaObjetivoProtegida>
            </RotaAutenticada>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </ObjetivoProvider>
  );
}

export default App;