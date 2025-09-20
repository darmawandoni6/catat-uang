import type { FC } from 'react';

import { Target } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@component/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { Progress } from '@component/ui/progress';
import { formatCurrency } from '@util/currency';
import { cn } from '@util/tn-merge';

import type { BucketAPI } from '../types';

interface Props {
  data: BucketAPI;
}
const Bucket: FC<Props> = ({ data }) => {
  const haveTarget = data.target > 0;
  const progress = (data.total_balance / data.target) * 100;
  const isCompleted = data.total_balance >= data.target;

  return (
    <Card className="inline-grid w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <CardTitle className="text-lg max-sm:text-sm">
              <Link to={`/bucket/${data.id}`} className="capitalize">
                {data.name}
              </Link>
            </CardTitle>
          </div>
          {haveTarget && isCompleted && (
            <Badge variant="outline" className="bg-green-100 text-xs text-green-800">
              Selesai
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm max-sm:text-xs">{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-sm:space-y-2 max-sm:pt-0">
        {haveTarget && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Progress</span>
              <span className="text-sm font-medium">{Math.floor(progress)}%</span>
            </div>
            <Progress value={progress} className="text-primary/20 h-2" />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Terkumpul</span>
            <span className={cn('font-semibold', data.total_balance < 0 ? 'text-secondary' : 'text-primary')}>
              {formatCurrency(data.total_balance)}
            </span>
          </div>
          {haveTarget && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Target</span>
              <span className="text-sm font-medium">{formatCurrency(data.target)}</span>
            </div>
          )}
          {haveTarget && (
            <div className="flex items-center justify-between border-t pt-2">
              <span className="text-muted-foreground text-sm">Sisa</span>
              <span className="text-sm font-medium text-orange-600">
                {formatCurrency(Math.max(0, data.target - data.total_balance))}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Bucket;
