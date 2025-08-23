import type { FC } from 'react';
import { useMemo } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { formatCurrency } from '@util/currency';

import type { DashboardTransaction } from '../types';

const COLORS = ['#0891b2', '#ec4899', '#dc2626', '#f59e0b', '#4b5563', '#10b981', '#8b5cf6'];

interface Props {
  data: DashboardTransaction['staticData'];
}
const Statistik: FC<Props> = ({ data }) => {
  const { totalType, totalCategory } = useMemo(() => {
    const objCat = Object.entries(data.totalCategory);
    return {
      totalType: { income: 0, expense: 0, ...data.totalType },
      totalCategory: objCat.length > 0 ? objCat.map(([key, value]) => ({ name: key, value })) : [],
    };
  }, [data]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base max-sm:text-sm">Statistik Cepat</CardTitle>
        <CardDescription className="text-sm max-sm:text-xs">Ringkasan keuangan Anda</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 max-sm:pt-0">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/5 rounded-lg p-3 text-center">
            <p className="text-primary text-2xl font-bold max-sm:text-xl">{totalType.income}</p>
            <p className="text-muted-foreground text-sm">Transaksi Masuk</p>
          </div>
          <div className="bg-secondary/5 rounded-lg p-3 text-center">
            <p className="text-secondary text-2xl font-bold max-sm:text-xl">{totalType.expense}</p>
            <p className="text-muted-foreground text-sm">Transaksi Keluar</p>
          </div>
        </div>

        {totalCategory.length > 0 && (
          <div>
            <h4 className="mb-2 text-base font-medium max-sm:text-sm">Kategori Pengeluaran Terbesar</h4>
            <div className="space-y-2">
              {totalCategory.map(({ name, value }, index) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <div className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="truncate text-base max-sm:text-xs">{name}</span>
                  </div>
                  <span className="ml-2 flex-shrink-0 text-base font-medium max-sm:text-xs">
                    {formatCurrency(value)}
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
