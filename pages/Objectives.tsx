
import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, Circle, Sparkles, Plus, Trash2, X } from 'lucide-react';
import { Objective, Milestone } from '../types';
import { generateMilestones } from '../services/geminiService';

interface ObjectivesProps {
  objective: Objective;
}

const Objectives: React.FC<ObjectivesProps> = ({ objective }) => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ title: '', description: '' });

  // Load mock milestones if none exist
  useEffect(() => {
    setMilestones([
      { id: '1', objective_id: objective.id, title: 'Definir Roteiro Inicial', description: 'Escolher cidades e tempo em cada uma', is_completed: true, order_index: 0 },
      { id: '2', objective_id: objective.id, title: 'Tirar Passaporte', description: 'Agendar na Polícia Federal', is_completed: false, order_index: 1 },
      { id: '3', objective_id: objective.id, title: 'Reservar Acomodação', description: 'Primeiros 15 dias em Dublin', is_completed: false, order_index: 2 },
    ]);
  }, [objective.id]);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const result = await generateMilestones(objective.name, objective.description || '', objective.target_amount, objective.target_currency);
    
    if (result && result.length > 0) {
      const newMilestones = result.map((m: any, idx: number) => ({
        id: Math.random().toString(36).substr(2, 9),
        objective_id: objective.id,
        title: m.title,
        description: m.description,
        is_completed: false,
        order_index: milestones.length + idx
      }));
      setMilestones([...milestones, ...newMilestones]);
    }
    setIsGenerating(false);
  };

  const handleAddManualMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.title) return;

    const ms: Milestone = {
      id: Math.random().toString(36).substr(2, 9),
      objective_id: objective.id,
      title: newMilestone.title,
      description: newMilestone.description,
      is_completed: false,
      order_index: milestones.length
    };

    setMilestones([...milestones, ms]);
    setNewMilestone({ title: '', description: '' });
    setShowAddModal(false);
  };

  const toggleMilestone = (id: string) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, is_completed: !m.is_completed } : m));
  };

  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Jornada da Meta</h1>
          <p className="text-emerald-600">Pequenos passos para grandes conquistas</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            <Sparkles size={20} />
            {isGenerating ? 'Gerando...' : 'IA: Gerar Marcos'}
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100"
          >
            <Plus size={20} />
            Novo Marco
          </button>
        </div>
      </header>

      <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600">
            <Target size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-emerald-900">{objective.name}</h2>
            <p className="text-emerald-500 font-medium">{objective.description}</p>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          {milestones.length > 0 && <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-emerald-100"></div>}

          <div className="space-y-6 relative">
            {milestones.length === 0 && (
              <div className="text-center py-12">
                <p className="text-emerald-400 font-medium italic">Nenhum marco definido ainda. Use a IA ou adicione manualmente!</p>
              </div>
            )}
            {milestones.sort((a,b) => a.order_index - b.order_index).map((ms, idx) => (
              <div key={ms.id} className="flex gap-6 group">
                <button 
                  onClick={() => toggleMilestone(ms.id)}
                  className={`z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                    ms.is_completed 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                      : 'bg-white border-2 border-emerald-100 text-emerald-200 hover:border-emerald-300'
                  }`}
                >
                  {ms.is_completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                <div className="flex-1 bg-emerald-50/50 group-hover:bg-emerald-50 p-6 rounded-3xl border border-transparent group-hover:border-emerald-100 transition-all flex items-start justify-between">
                  <div>
                    <h4 className={`text-lg font-bold transition-all ${ms.is_completed ? 'text-emerald-900 line-through opacity-50' : 'text-emerald-900'}`}>
                      {ms.title}
                    </h4>
                    <p className={`text-sm mt-1 ${ms.is_completed ? 'text-emerald-400 line-through opacity-50' : 'text-emerald-600'}`}>
                      {ms.description}
                    </p>
                  </div>
                  <button 
                    onClick={() => deleteMilestone(ms.id)}
                    className="text-red-200 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-emerald-600 p-8 flex justify-between items-center text-white">
              <div>
                <h2 className="text-2xl font-bold">Novo Marco</h2>
                <p className="text-emerald-100 text-sm">Adicione uma etapa ao seu objetivo</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddManualMilestone} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">Título do Marco</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: Reservar passagens"
                    value={newMilestone.title}
                    onChange={e => setNewMilestone({...newMilestone, title: e.target.value})}
                    className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-400 uppercase ml-2 mb-1 block">Descrição (Opcional)</label>
                  <textarea 
                    placeholder="Ex: Pesquisar melhores preços no Google Flights"
                    value={newMilestone.description}
                    onChange={e => setNewMilestone({...newMilestone, description: e.target.value})}
                    rows={3}
                    className="w-full bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-4 text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
              >
                Criar Marco
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Objectives;
