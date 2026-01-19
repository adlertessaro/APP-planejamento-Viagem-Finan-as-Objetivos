
import React from 'react';
import { Target, Plus } from 'lucide-react';
import { MOCK_OBJECTIVES } from '../constants';
import { Objective } from '../types';

interface GoalSelectionProps {
  onSelect: (objective: Objective) => void;
}

const GoalSelection: React.FC<GoalSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-emerald-900">Bem-vindo, Viajante!</h1>
          <p className="text-emerald-600 text-lg">Qual meta vamos gerenciar hoje?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_OBJECTIVES.map((goal) => (
            <button
              key={goal.id}
              onClick={() => onSelect(goal)}
              className="group p-6 bg-white border-2 border-transparent hover:border-emerald-500 rounded-3xl text-left transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Target size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-900">{goal.name}</h3>
                <p className="text-emerald-500 text-sm line-clamp-2 mt-1">{goal.description}</p>
              </div>
              <div className="mt-auto pt-4 flex items-center justify-between w-full border-t border-emerald-50">
                <span className="text-emerald-700 font-bold">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: goal.target_currency }).format(goal.target_amount)}
                </span>
                <span className="text-xs text-emerald-400 font-medium">Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
              </div>
            </button>
          ))}

          <button className="p-6 bg-emerald-100/50 border-2 border-dashed border-emerald-200 rounded-3xl text-emerald-600 hover:bg-emerald-100 hover:border-emerald-300 transition-all flex flex-col items-center justify-center gap-2">
            <Plus size={32} />
            <span className="font-bold">Criar Novo Objetivo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalSelection;
