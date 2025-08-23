import { type FC, useState } from 'react';

import { TrendingDown, TrendingUp } from 'lucide-react';

import { Badge } from '@component/ui/badge';
import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { formatCurrency } from '@util/currency';

import type { TransactionData, TransactionsParams } from '../types';

interface Props {
  data: TransactionData[];
  params: TransactionsParams;
  loadMore: boolean;
  onFetch: (params: TransactionsParams) => Promise<void>;
}
const ListTransaksi: FC<Props> = ({ data, loadMore, params, onFetch }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      await onFetch({ ...params, page: String(Number(params.page) + 1) });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base max-sm:text-sm">List Transaksi</CardTitle>
        <CardDescription className="text-sm max-sm:text-xs">Semua Transaksi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-base max-sm:py-8 max-sm:text-xs">
              Belum ada transaksi. Tambahkan transaksi pertama Anda!
            </p>
          ) : (
            data.map(transaction => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div
                    className={`flex-shrink-0 rounded-full p-1.5 ${
                      transaction.type === 'income' ? 'bg-primary/10' : 'bg-secondary/10'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <TrendingUp className="text-primary h-4 w-4" />
                    ) : (
                      <TrendingDown className="text-secondary h-4 w-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{transaction.category}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(transaction.date).toLocaleDateString('id-ID')}
                    </p>
                    {transaction.description && (
                      <p className="text-muted-foreground truncate text-xs">{transaction.description}</p>
                    )}
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0 text-right">
                  <p
                    className={`text-sm font-semibold max-sm:text-sm ${
                      transaction.type === 'income' ? 'text-primary' : 'text-secondary'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {transaction.type === 'income' ? 'Masuk' : 'Keluar'}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
        {loadMore && (
          <Button loading={loading} variant="outline" className="mt-4 w-full" onClick={handleRefresh}>
            Load more...
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ListTransaksi;
