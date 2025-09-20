import type { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { Card, CardContent, CardHeader, CardTitle } from '@component/ui/card';
import { formatCurrency } from '@util/currency';

interface Props {
  title: string;
  icon: ReactNode;
  total: number;
  isUp: boolean;
  className?: string;
}
const TotalCard: FC<Props> = ({ title, icon, total, isUp, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 max-sm:pb-0">
        <CardTitle className="text-base font-medium max-sm:text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className={clsx('text-lg font-bold', isUp ? 'text-primary' : 'text-secondary')}>
          {formatCurrency(total)}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
