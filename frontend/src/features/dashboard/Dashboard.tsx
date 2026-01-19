
import React from 'react';
import { Objective, Transaction } from '../../types/types';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardProps {
  objective: Objective;
}

const Dashboard: React.FC<DashboardProps> = ({ objective }) => {
  // Mock data for charts
  const historyData = [
    { name: 'Jan', value: 2400 },
    { name: 'Fev', value: 3500 },
    { name: 'Mar', value: 3200 },
    { name: 'Abr', value: 4800 },
    { name: 'Mai', value: 5100 },
    { name: 'Jun', value: 7800 },
  ];

  const categoryData = [
    { name: 'Acomodação', value: 40, color: '#059669' },
    { name: 'Transporte', value: 30, color: '#10b981' },
    { name: 'Visto/Docs', value: 15, color: '#34d399' },
    { name: 'Lazer', value: 15, color: '#6ee7b7' },
  ];

  const currentSavings = 12500;
  const progressPercent = Math.min(Math.round((currentSavings / objective.target_amount) * 100), 100);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">{objective.name}</h1>
          <p className="text-emerald-600">Visão geral do seu progresso financeiro</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3">
          <Calendar className="text-emerald-500" size={20} />
          <div>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Meta Final</p>
            <p className="text-sm font-semibold text-emerald-900">{new Date(objective.deadline).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-400">Total Poupado</p>
            <h3 className="text-2xl font-bold text-emerald-900">R$ 12.500,00</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-400">Faltam</p>
            <h3 className="text-2xl font-bold text-amber-900">R$ 37.500,00</h3>
          </div>
        </div>
        <div className="bg-emerald-600 p-6 rounded-3xl shadow-lg shadow-emerald-100 text-white flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-100">Progresso Geral</p>
            <h3 className="text-2xl font-bold">{progressPercent}%</h3>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-emerald-900">Progresso da Meta</h3>
          <span className="text-emerald-600 font-bold">{progressPercent}% concluído</span>
        </div>
        <div className="w-full h-4 bg-emerald-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-600 rounded-full transition-all duration-1000 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-emerald-100">
          <h3 className="text-lg font-bold text-emerald-900 mb-6">Histórico de Poupança</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 flex flex-col">
          <h3 className="text-lg font-bold text-emerald-900 mb-6">Distribuição de Gastos</h3>
          <div className="h-64 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-emerald-700 font-medium">{cat.name}</span>
                </div>
                <span className="text-sm font-bold text-emerald-900">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
