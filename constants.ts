
import { Objective, Currency } from './types';

export const CURRENCIES: Currency[] = ['BRL', 'USD', 'EUR'];

export const EXCHANGE_RATES: Record<Currency, number> = {
  BRL: 1,
  USD: 5.45,
  EUR: 6.05,
};

export const CATEGORIES = [
  'Transporte',
  'Alimentação',
  'Acomodação',
  'Documentação',
  'Lazer',
  'Outros'
];

export const MOCK_OBJECTIVES: Objective[] = [
  {
    id: '1',
    user_id: 'u1',
    name: 'Intercâmbio Irlanda',
    target_amount: 50000,
    target_currency: 'BRL',
    deadline: '2025-12-01',
    description: 'Viagem de estudos e trabalho em Dublin.',
    created_at: '2024-01-01'
  },
  {
    id: '2',
    user_id: 'u1',
    name: 'Nova Moto',
    target_amount: 15000,
    target_currency: 'BRL',
    deadline: '2024-10-15',
    description: 'Comprar uma Honda CB 300F Twister.',
    created_at: '2024-02-15'
  }
];
