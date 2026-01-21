import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './src/components/Layout';
import Login from './src/features/auth/Login';
import GoalSelection from './src/features/objetivos/GoalSelection';
import Dashboard from './src/features/dashboard/Dashboard';
import Finance from './src/features/financeiro/Finance';
// Importe os demais componentes conforme necessário
import { ObjetivoProvider, useObjetivoAtivo } from './src/context/ObjetivoContext';
import { supabase } from './src/api/supabase';
import { useState as useLocalState } from 'react';
import { Objective } from './src/types/types';
import Documents from './src/features/documentos/Documents';

// --- COMPONENTES DE PROTEÇÃO DE ROTA ---

const RotaObjetivoProtegida = ({ children }: { children: React.ReactNode }) => {
  const { objetivoId } = useObjetivoAtivo();
  return objetivoId ? <>{children}</> : <Navigate to="/selecionar-objetivo" replace />;
};

const RotaAutenticada = ({ children, loggedIn }: { children: React.ReactNode; loggedIn: boolean | null }) => {
  if (loggedIn === false) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const RotaPublica = ({ children, loggedIn }: { children: React.ReactNode; loggedIn: boolean | null }) => {
  if (loggedIn === true) return <Navigate to="/selecionar-objetivo" replace />;
  return <>{children}</>;
};

// --- WRAPPER PARA O LAYOUT ---

const InternalLayout = ({ children }: { children: React.ReactNode }) => {
  const { objetivoId, setObjetivoId } = useObjetivoAtivo();
  const [objectiveName, setObjectiveName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Busca o nome do objetivo para exibir no Sidebar
  useEffect(() => {
    const fetchObjectiveName = async () => {
      if (objetivoId) {
        const { data } = await supabase
          .from('objetivos')
          .select('titulo')
          .eq('id', objetivoId)
          .single();
        if (data) setObjectiveName(data.titulo);
      }
    };
    fetchObjectiveName();
  }, [objetivoId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleClearObjective = () => {
    setObjetivoId(null);
    navigate('/selecionar-objetivo');
  };

  return (
    <Layout 
      selectedObjectiveName={objectiveName} 
      onClearObjective={handleClearObjective} 
      onLogout={handleLogout}
    >
      {children}
    </Layout>
  );
};

// --- COMPONENTE PRINCIPAL ---

// Loader component to fetch Objective by id and render Finance

function FinanceLoader({ objetivoId }: { objetivoId: string | null }) {
  const [objective, setObjective] = useLocalState<Objective | null>(null);
  const [loading, setLoading] = useLocalState(true);

  useEffect(() => {
    const fetchObjective = async () => {
      if (!objetivoId) return;
      const { data } = await supabase
        .from('objetivos')
        .select('*')
        .eq('id', objetivoId)
        .single();
      setObjective(data as Objective);
      setLoading(false);
    };
    fetchObjective();
  }, [objetivoId]);

  if (loading || !objective) {
    return <div className="flex h-screen items-center justify-center text-emerald-600 font-bold">Carregando...</div>;
  }

  return <Finance objective={objective} />;
}

function DocumentsLoader({ objetivoId }: { objetivoId: string | null }) {
  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjective = async () => {
      if (!objetivoId) return;
      const { data } = await supabase
        .from('objetivos')
        .select('*')
        .eq('id', objetivoId)
        .single();
      setObjective(data as Objective);
      setLoading(false);
    };
    fetchObjective();
  }, [objetivoId]);

  if (loading || !objective) {
    return <div className="flex h-screen items-center justify-center text-emerald-600 font-bold">Carregando...</div>;
  }

  // Adapte para o tipo esperado em Documents
  return <Documents objetivoSelecionado={{ id: objective.id, nome: objective.titulo }} />;
}

function AppContent() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { objetivoId } = useObjetivoAtivo();

  const checkLoginStatus = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    setLoggedIn(data.session !== null);
  }, []);

  useEffect(() => {
    checkLoginStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setLoggedIn(session !== null);
      if (event === 'SIGNED_OUT') navigate('/login');
    });

    return () => subscription.unsubscribe();
  }, [checkLoginStatus, navigate]);

  if (loggedIn === null) {
    return <div className="flex h-screen items-center justify-center text-emerald-600 font-bold">Carregando...</div>;
  }

  return (
    <Routes>
      {/* Rotas sem Layout (Login e Seleção) */}
      <Route path="/login" element={
        <RotaPublica loggedIn={loggedIn}>
          <Login onLogin={() => setLoggedIn(true)} />
        </RotaPublica>
      } />

      <Route path="/selecionar-objetivo" element={
        <RotaAutenticada loggedIn={loggedIn}>
          <GoalSelection />
        </RotaAutenticada>
      } />

      {/* Rotas Internas com Layout e Proteção */}
      <Route path="/dashboard" element={
        <RotaAutenticada loggedIn={loggedIn}>
          <RotaObjetivoProtegida>
            <InternalLayout>
              <Dashboard />
            </InternalLayout>
          </RotaObjetivoProtegida>
        </RotaAutenticada>
      } />

      {/* Rota Financeiro com Loader */}
      <Route path="/financeiro" element={
        <RotaAutenticada loggedIn={loggedIn}>
          <RotaObjetivoProtegida>
            <InternalLayout>
              <FinanceLoader objetivoId={objetivoId} />
            </InternalLayout>
          </RotaObjetivoProtegida>
        </RotaAutenticada>
      } />

      <Route path="/documentos" element={
        <RotaAutenticada loggedIn={loggedIn}>
          <RotaObjetivoProtegida>
            <InternalLayout>
              <DocumentsLoader objetivoId={objetivoId} />
            </InternalLayout>
          </RotaObjetivoProtegida>
        </RotaAutenticada>
      } />

      <Route path="/marcos" element={
        <RotaAutenticada loggedIn={loggedIn}>
          <InternalLayout>
            <GoalSelection />
          </InternalLayout>
        </RotaAutenticada>
      } />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// Export final com os Providers necessários
export default function App() {
  return (
    <ObjetivoProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ObjetivoProvider>
  );
}