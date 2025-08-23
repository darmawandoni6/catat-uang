import type { FC } from 'react';

import { Filter as FilterIcon } from 'lucide-react';

import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';

import type { FilterReport } from '../types';

interface Props {
  type: FilterReport;
  onRefresh: (type: FilterReport) => void;
}
const Filter: FC<Props> = ({ type, onRefresh }) => {
  const handleFilter = (type: FilterReport) => {
    onRefresh(type);
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
            variant={type === 'day' ? 'default' : 'outline'}
            size="sm"
            className="py-1.5 max-sm:text-xs"
            onClick={() => handleFilter('day')}
          >
            Hari Ini
          </Button>
          <Button
            variant={type === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilter('month')}
            className="py-1.5 max-sm:text-xs"
          >
            Bulan Ini
          </Button>
          <Button
            variant={type === 'year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilter('year')}
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
