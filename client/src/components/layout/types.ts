import type { BucketAPI } from '@page/home/types';

export interface InitialState {
  isLoading: boolean;
  me: {
    sub: string;
    email: string;
    name: string;
  };
  total_summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
  bucket: BucketAPI;
  buckets: BucketAPI[];
}
