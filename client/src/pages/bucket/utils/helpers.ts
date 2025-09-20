import type { InitialState } from '@component/layout/types';

import type { Dashboard, FilterReport, TransactionAPI } from '../types';

export function onYear(date: Date, filter: FilterReport) {
  const now = new Date();
  switch (filter) {
    case 'day':
      console.log(now.getFullYear() === date.getFullYear(), now.getMonth() === date.getMonth());

      return now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth();
    case 'month':
      return now.getFullYear() === date.getFullYear();
    case 'year':
    default:
      return true;
  }
}
export function onDashboard(data: TransactionAPI[], filter: FilterReport) {
  const grafik: Dashboard['grafik'] = {};
  const total_type: { [K: string]: number } = {};
  const total_category: { [K: string]: number } = {};

  for (const { type, category, amount, date } of data) {
    // grafik
    const name = {
      day: new Date(date).getDate(),
      month: new Date(date).getMonth() + 1,
      year: new Date(date).getFullYear(),
    };
    const key_grafik = name[filter];

    if (!grafik[key_grafik]) {
      grafik[key_grafik] = { balance: 0, expense: 0, income: 0 };
    }
    if (type === 'income') {
      grafik[key_grafik].income += amount;
    } else if (type === 'expense') {
      grafik[key_grafik].expense += amount;
    }
    grafik[key_grafik].balance = grafik[key_grafik].income - grafik[key_grafik].expense;

    // total_type
    if (!total_type[type]) {
      total_type[type] = 0;
    }

    // total_category
    if (type === 'expense') {
      if (!total_category[category]) {
        total_category[category] = 0;
      }
      total_category[category] += amount;
    }

    total_type[type] += 1;
  }

  return { grafik, total_type, total_category };
}

export const onSummary = (data: TransactionAPI[]) => {
  const summary: InitialState['summary'] = data.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.totalIncome += item.amount;
        return acc;
      }

      acc.totalExpense += item.amount;
      return acc;
    },
    {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    },
  );

  summary.balance = summary.totalIncome - summary.totalExpense;

  return summary;
};
