export type FilterReport = 'day' | 'month' | 'year';

export interface Dashboard {
  grafik: { [K: string]: { expense: number; income: number; balance: number } };
  total_category: { [K: string]: number };
  total_type: { [K: string]: number };
}

export interface TransactionForm {
  type: 'expense' | 'income';
  amount: string;
  category: string;
  description: string;
  date: string;
}

export interface TransactionPayload {
  type: 'expense' | 'income';
  amount: number;
  category: string;
  description: string;
  date: Date;
  bucket_id: number;
}

export interface TransactionAPI {
  id: number;
  type: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
  user_sub: string;
  bucket_id: number;
}
