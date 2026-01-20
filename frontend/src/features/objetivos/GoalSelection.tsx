import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Target, Plane, Wallet, ChevronRight } from 'lucide-react';
import { supabase } from '../../api/supabase';
import { useObjetivoAtivo } from '../../context/ObjetivoContext';
import { Objective } from '../../types/types';
import { stat } from 'fs';

const GoalSelection: React.FC = () => {
  const [objetivos, setObjetivos] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);
  const { setObjetivoId } = useObjetivoAtivo();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [moedaAlvo, setMoedaAlvo] = useState('BRL');

  useEffect(() => {
    fetchObjetivos();
  }, []);

  const fetchObjetivos = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('objectives')
        .select('*')
        .eq('user_id', user.id);
      
      if (!error && data) setObjetivos(data);
    }
    setLoading(false);
  };

  const handleCriarObjetivo = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) return;

    const novoObjetivo = {
      user_id: user.id,
      titulo,
      descricao,
      valor_meta: parseFloat(valorMeta),
      moeda_alvo,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active',
    };

    const { error } = await supabase
      .from('objectives')
      .insert(novoObjetivo);

    if (!error) {
      fetchObjetivos();
      setIsModalOpen(false);
    }
  };

  const selecionar = (id: string) => {
    setObjetivoId(id); // Define o "filtro global"
    navigate('/dashboard');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-emerald-600 font-bold">Carregando seus planos...</div>;

const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate('/login');
}

  return (
    <div className="min-h-screen bg-emerald-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <button 
            onClick={handleLogout}
            className="text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Sair
          </button>
        </div>
        <header className="mb-12">
          <h1 className="text-4xl font-black text-emerald-900 mb-2">Qual o plano de hoje?</h1>
          <p className="text-emerald-600 font-medium">Selecione um objetivo para gerenciar suas finanças.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card de Adicionar Novo */}
          <button 
            onClick={() => {/* Lógica para abrir modal de novo objetivo */}}
            className="group border-2 border-dashed border-emerald-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:bg-white transition-all min-h-[250px]"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Plus size={32} />
            </div>
            <span className="font-bold text-emerald-700 uppercase tracking-widest text-sm">Novo Objetivo</span>
          </button>

          {/* Listagem de Objetivos Existentes */}
          {objetivos.map((obj) => (
            <div 
              key={obj.id}
              onClick={() => selecionar(obj.id)}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-emerald-100/50 border border-emerald-50 hover:border-emerald-500 cursor-pointer group transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 text-emerald-100 group-hover:text-emerald-500 transition-colors">
                <Target size={40} strokeWidth={1} />
              </div>

              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Objetivo Ativo</span>
                <h3 className="text-2xl font-black text-emerald-900 mt-1">{obj.titulo}</h3>
              </div>

              <div className="flex items-center gap-3 text-emerald-600 font-bold mb-8">
                <div className="px-3 py-1 bg-emerald-50 rounded-full text-xs uppercase tracking-tighter">
                  {obj.moeda_alvo}
                </div>
                <span className="text-sm">Meta: {obj.valor_meta.toLocaleString('pt-BR', { style: 'currency', currency: obj.moeda_alvo })}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-emerald-50">
                <span className="text-xs font-bold text-emerald-300 uppercase">Acessar Painel</span>
                <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalSelection;