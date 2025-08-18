import AreaComponent from '@component/chart/Area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';

const Grafik = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base max-sm:text-sm">Ringkasan Bulanan</CardTitle>
        <CardDescription className="text-sm max-sm:text-xs">
          Perbandingan pemasukan dan pengeluaran per bulan
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pt-0 max-sm:p-0">
        <AreaComponent
          dataValue={[
            { name: 'test 1', harga: 1 },
            { name: 'test 2', harga: 2 },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default Grafik;
