import { useState } from 'react';

import { Filter as FilterIcon } from 'lucide-react';

import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';

const Filter = () => {
  const [reportFilters, setReportFilters] = useState({
    period: 'month' as 'day' | 'month' | 'year',
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    category: 'all',
    type: 'all' as 'all' | 'income' | 'expense',
  });

  const setReportPeriod = (period: 'day' | 'month' | 'year') => {
    const today = new Date();
    let startDate: Date;
    let endDate = new Date();

    switch (period) {
      case 'day':
        startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        break;
      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'year':
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
    }

    setReportFilters({
      ...reportFilters,
      period,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold max-sm:text-sm">
          <FilterIcon className="h-4 w-4" />
          Filter Laporan
        </CardTitle>
        <CardDescription className="text-sm max-sm:text-xs">
          Pilih kategori untuk laporan yang lebih detail
        </CardDescription>
      </CardHeader>
      <CardContent className="max-sm:pt-0">
        {/* Period Quick Buttons */}
        <div className="grid grid-cols-3 gap-1">
          <Button
            variant={reportFilters.period === 'day' ? 'default' : 'outline'}
            // size="sm"
            className="py-1.5 max-sm:text-xs"
          >
            Hari Ini
          </Button>
          <Button
            variant={reportFilters.period === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setReportPeriod('month')}
            className="py-1.5 max-sm:text-xs"
          >
            Bulan Ini
          </Button>
          <Button
            variant={reportFilters.period === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setReportPeriod('year')}
            className="py-1.5 max-sm:text-xs"
          >
            Tahun Ini
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filter;
