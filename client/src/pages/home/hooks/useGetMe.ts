import { useState } from 'react';

import { getMe as fetchMe } from '@page/home/repository/api';

import type { Me } from '../types';
import { data_me, local_expired } from '../utils/constants';

const useGetMe = () => {
  const [{ me, summary }, setMe] = useState<Me>({
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
  });

  const onExpired = (val: string) => {
    const now = Date.now();
    const isExpired = now > Number(val);
    if (isExpired) {
      localStorage.clear();
    }

    return isExpired;
  };

  const getMe = () => {
    const me = localStorage.getItem(data_me);
    const expired = localStorage.getItem(local_expired);

    if (me && expired) {
      const isExpired = onExpired(expired);
      if (isExpired) getMe();
      setMe(JSON.parse(me));
      return;
    }
    fetchMe().then(res => {
      setMe(prev => ({ ...prev, ...res }));
    });
  };

  const handleUpdateBalance = (type: 'income' | 'expense', value: number) => {
    const local = localStorage.getItem(data_me)!;
    const { summary }: Me = JSON.parse(local);
    if (type === 'income') {
      summary.totalIncome += value;
    } else if (type === 'expense') {
      summary.totalExpense += value;
    }
    summary.balance = summary.totalIncome - summary.totalExpense;
    setMe(prev => ({ ...prev, summary: { ...summary } }));
  };

  return {
    me,
    summary,
    getMe,
    handleUpdateBalance,
  };
};

export default useGetMe;
