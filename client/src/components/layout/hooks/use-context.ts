import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

import type { InitialState } from '../types';

export const initialState: InitialState = {
  isLoading: false,
  me: {
    sub: '',
    email: '',
    name: '',
  },
  summary: {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  },
  total_summary: {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  },
  bucket: {
    id: 0,
    name: '',
    description: '',
    target: 0,
    created_at: '',
    updated_at: '',
    user_sub: '',
    total_balance: 0,
    total_expense: 0,
    total_income: 0,
  },
  buckets: [],
};

export const Context = createContext<InitialState>(initialState);
export const HandleContext = createContext<Dispatch<SetStateAction<InitialState>>>(() => {});

export const useStateGlobal = () => useContext(Context);
export const useSetStateGlobal = () => useContext(HandleContext);
