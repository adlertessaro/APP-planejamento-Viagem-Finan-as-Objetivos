
/**
 * DATABASE SCHEMA (SQL for Supabase)
 * 
 * -- 1. Objectives Table
 * CREATE TABLE objectives (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id UUID REFERENCES auth.users(id),
 *   name TEXT NOT NULL,
 *   target_amount DECIMAL NOT NULL,
 *   target_currency TEXT DEFAULT 'BRL',
 *   deadline DATE,
 *   description TEXT,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * -- 2. Milestones Table (AI Generated or Manual)
 * CREATE TABLE milestones (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
 *   title TEXT NOT NULL,
 *   description TEXT,
 *   target_date DATE,
 *   is_completed BOOLEAN DEFAULT FALSE,
 *   order_index INTEGER
 * );
 * 
 * -- 3. Transactions Table
 * CREATE TABLE transactions (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
 *   type TEXT CHECK (type IN ('income', 'expense')),
 *   amount DECIMAL NOT NULL,
 *   currency TEXT NOT NULL, -- BRL, USD, EUR
 *   converted_amount DECIMAL, -- Amount in target_currency at time of transaction
 *   category TEXT,
 *   description TEXT,
 *   date DATE DEFAULT CURRENT_DATE
 * );
 * 
 * -- 4. Documents Table
 * CREATE TABLE documents (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   objective_id UUID REFERENCES objectives(id) ON DELETE CASCADE,
 *   name TEXT NOT NULL,
 *   file_url TEXT NOT NULL,
 *   file_type TEXT,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 */

export type Currency = 'BRL' | 'USD' | 'EUR';

export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface Objective {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  target_currency: Currency;
  deadline: string;
  description?: string;
  created_at: string;
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
  id: string;
  objective_id: string;
  type: 'income' | 'expense';
  amount: number;
  currency: Currency;
  converted_amount: number; // In base currency of objective
  category: string;
  description: string;
  date: string;
}

export interface Document {
  id: string;
  objective_id: string;
  name: string;
  file_url: string;
  file_type: string;
  created_at: string;
}
