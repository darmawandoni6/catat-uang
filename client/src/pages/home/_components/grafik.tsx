import { type FC, useMemo } from 'react';

import AreaComponent from '@component/chart/Area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';

import type { DashboardTransaction } from '../types';

interface Props {
  data: DashboardTransaction['grafik'];
}
const Grafik: FC<Props> = ({ data }) => {
  const dataValue = useMemo(() => {
    return Object.entries(data);
  }, [data]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base max-sm:text-sm">Ringkasan Bulanan</CardTitle>
        <CardDescription className="text-sm max-sm:text-xs">
          Perbandingan pemasukan dan pengeluaran per bulan
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pt-0 max-sm:p-0">
        {dataValue.length > 0 ? (
          <AreaComponent dataValue={dataValue.map(([key, value]) => ({ name: key, value }))} />
        ) : (
          <p className="text-muted-foreground py-6 text-center text-base max-sm:py-8 max-sm:text-xs">
            Belum ada transaksi. Tambahkan transaksi pertama Anda!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Grafik;
