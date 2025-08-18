import { useMemo } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { formatCurrency } from '@util/currency';

import { transactions } from '../utils/dummy';

const expenseCategories = ['Makanan', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 'Lainnya'];
const COLORS = ['#0891b2', '#ec4899', '#dc2626', '#f59e0b', '#4b5563', '#10b981', '#8b5cf6'];

const Statistik = () => {
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const chartData = useMemo(() => {
    // Daily trend data for the last 30 days
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    const dailyData = last30Days.map(date => {
      const dayTransactions = transactions.filter(t => t.date === date);
      const income = dayTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const expense = dayTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

      return {
        date: new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
        income,
        expense,
        balance: income - expense,
      };
    });

    // Category breakdown for expenses
    const expenseByCategory = expenseCategories
      .map(category => {
        const total = transactions
          .filter(t => t.type === 'expense' && t.category === category)
          .reduce((sum, t) => sum + t.amount, 0);
        return {
          category,
          amount: total,
          percentage: totalExpense > 0 ? ((total / totalExpense) * 100).toFixed(1) : '0',
        };
      })
      .filter(item => item.amount > 0);

    // Monthly summary
    const monthlyData = transactions.reduce(
      (acc, transaction) => {
        const month = new Date(transaction.date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
        if (!acc[month]) {
          acc[month] = { month, income: 0, expense: 0 };
        }
        if (transaction.type === 'income') {
          acc[month].income += transaction.amount;
        } else {
          acc[month].expense += transaction.amount;
        }
        return acc;
      },
      {} as Record<string, { month: string; income: number; expense: number }>,
    );

    return {
      daily: dailyData,
      categories: expenseByCategory,
      monthly: Object.values(monthlyData).slice(-6), // Last 6 months
    };
  }, [transactions, totalExpense]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base max-sm:text-sm">Statistik Cepat</CardTitle>
        <CardDescription className="text-sm max-sm:text-xs">Ringkasan keuangan Anda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 max-sm:pt-0">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/5 rounded-lg p-3 text-center">
            <p className="text-primary text-2xl font-bold max-sm:text-xl">
              {transactions.filter(t => t.type === 'income').length}
            </p>
            <p className="text-muted-foreground text-sm">Transaksi Masuk</p>
          </div>
          <div className="bg-secondary/5 rounded-lg p-3 text-center">
            <p className="text-secondary text-2xl font-bold max-sm:text-xl">
              {transactions.filter(t => t.type === 'expense').length}
            </p>
            <p className="text-muted-foreground text-sm">Transaksi Keluar</p>
          </div>
        </div>

        {chartData.categories.length > 0 && (
          <div>
            <h4 className="mb-2 text-base font-medium max-sm:text-sm">Kategori Pengeluaran Terbesar</h4>
            <div className="space-y-2">
              {chartData.categories.slice(0, 3).map((category, index) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <div className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="truncate text-base max-sm:text-xs">{category.category}</span>
                  </div>
                  <span className="ml-2 flex-shrink-0 text-base font-medium max-sm:text-xs">
                    {formatCurrency(category.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Statistik;
