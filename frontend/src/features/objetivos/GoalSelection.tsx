import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useObjetivoAtivo } from '../../context/ObjetivoContext';

// Dados de teste (depois buscaremos do Supabase)
const OBJETIVOS_MOCK = [
  { id: '1', titulo: 'Viagem para Itália', tipo: 'Viagem' },
  { id: '2', titulo: 'Reserva de Emergência', tipo: 'Financeiro' },
];

const GoalSelection = () => {
  const navigate = useNavigate();
  const { setObjetivoId } = useObjetivoAtivo();

  const selecionar = (id: string) => {
    setObjetivoId(id); // Guarda o ID no Contexto e no LocalStorage
    navigate('/dashboard'); // Leva para a página principal
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-emerald-600">Qual seu foco agora?</h1>
      <div className="grid gap-4">
        {OBJETIVOS_MOCK.map((obj) => (
          <button
            key={obj.id}
            onClick={() => selecionar(obj.id)}
            className="p-6 bg-white rounded-xl shadow-md hover:border-emerald-500 border-2 transition-all text-left w-64"
          >
            <p className="font-semibold">{obj.titulo}</p>
            <p className="text-sm text-gray-500">{obj.tipo}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GoalSelection;