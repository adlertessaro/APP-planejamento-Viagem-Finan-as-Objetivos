import { ReactNode } from "react";

export type Currency = 'BRL' | 'USD' | 'EUR';

export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface Objective {
  id: string;
  usuario_id: string;
  titulo: string;
  tipo?: string;
  moeda_alvo: Currency;
  valor_meta: number;
  status: string;
  criado_em: string;
  atualizado_at: string;
  descricao?: string;
  prazo_meta?: string;
}

export interface Milestone {
  id: string;
  objective_id: string;
  title: string;
  description?: string;
  target_date?: string;
  is_completed: boolean;
  order_index: number;
}

export interface Transaction {
  type: string;
  date: string | number | Date;
  id: string;
  objetivo_id: string;
  valor: number;
  moeda: Currency;
  taxa_cambio: number;
  tipo: 'income' | 'expense';
  categoria: string;
  descricao: string;
  data_transacao: string;
  criado_em: string;
}

export interface Document {
  id: string;
  objective_id: string;
  name: string;
  file_url: string;
  file_type: string;
  created_at: string;
}
