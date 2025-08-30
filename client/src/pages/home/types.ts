export interface TransactionPayload {
  type: 'expense' | 'income';
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export interface TransactionForm {
  type: 'expense' | 'income';
  amount: string;
  category: string;
  description: string;
  date: string;
}

export interface TransactionsParams {
  page: string;
  pageSize: string;
  type: 'day' | 'month' | 'year';
}

export interface DashboardTransaction {
  grafik: {
    [K: string]: { expanse: number; income: number; balance: number };
  };
  staticData: {
    totalCategory: {
      [K: string]: number;
    };
    totalType: {
      [K: string]: number;
    };
  };
}

export interface Me {
  me: {
    sub: string;
    email: string;
    name: string;
  };
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
}

export type FilterReport = 'day' | 'month' | 'year';

export interface TransactionData {
  id: number;
  type: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
  user_sub: string;
}
export interface TransactionList {
  count: number;
  data: TransactionData[];
}
