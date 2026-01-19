
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

const RotaObjetivoProtegida = ({ children }: { children: React.ReactNode }) => {
  const { objetivoId } = useObjetivoAtivo();
  if (!objetivoId) {
    return <Navigate to="/selecionar-objetivo" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ObjetivoProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/selecionar-objetivo" element={<GoalSelection />} />

          <Route path="/dashboard" element={
            <RotaObjetivoProtegida>
              <Dashboard />
            </RotaObjetivoProtegida>
          } />
          <Route path="/financeiro" element={
            <RotaObjetivoProtegida>
              <Finance />
            </RotaObjetivoProtegida>
          } />
          <Route path="/objetivos" element={
            <RotaObjetivoProtegida>
              <Objectives />
            </RotaObjetivoProtegida>
          } />
          <Route path="/documentos" element={
            <RotaObjetivoProtegida>
              <Documents />
            </RotaObjetivoProtegida>
          } />
          <Route path="/configuracoes" element={
            <RotaObjetivoProtegida>
              <Settings />
            </RotaObjetivoProtegida>
          } />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </ObjetivoProvider>
  );
}

export default App;