import { useEffect, useState } from 'react';

import { Plus } from 'lucide-react';

import { useSetStateGlobal, useStateGlobal } from '@component/layout/hooks/use-context';
import type { InitialState } from '@component/layout/types';
import { Button } from '@component/ui/button';
import { cn } from '@util/tn-merge';
import { toastError } from '@util/toast';

import Bucket from './_components/bucket';
import DialogFormBucket from './_components/form-bucket';
import { fetchMe, getBucket } from './repository/api';
import { BucketAPI } from './types';

const Home = () => {
  const state = useStateGlobal();
  const setState = useSetStateGlobal();
  const [openBucket, setOpenBucket] = useState<boolean>(false);

  useEffect(() => {
    onGetMe();
  }, []);

  async function onGetMe() {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const res = await fetchMe();
      const data = await getBucket();

      const summary: InitialState['summary'] = data.reduce(
        (acc, cur) => {
          acc.balance += cur.total_balance;
          acc.totalIncome += cur.total_income;
          acc.totalExpense += cur.total_expense;

          return acc;
        },
        {
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
        },
      );

      setState(prev => ({ ...prev, me: res, summary, buckets: data }));
    } catch (error) {
      toastError(error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }

  const handleBucket = () => setOpenBucket(prev => !prev);
  const handleRefresh = (data: BucketAPI) => {
    setState(prev => ({ ...prev, buckets: [...prev.buckets, data] }));
  };

  return (
    <>
      <div className="space-y-6 p-4 max-sm:space-y-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold max-sm:text-lg">Bucket Tabungan</h2>
            <p className="text-muted-foreground text-sm">Kelola target tabungan Anda</p>
          </div>
          <Button className="flex items-center gap-2 max-sm:hidden" onClick={handleBucket}>
            <Plus className="h-4 w-4" />
            Tambah Bucket
          </Button>
        </div>

        <div
          className={cn(
            state.buckets.length <= 2 ? 'grid grid-cols-2 items-start max-sm:grid-cols-1' : 'columns-2 space-y-4',
            'gap-4 max-sm:columns-1',
          )}
        >
          {state.buckets.map(item => (
            <Bucket data={item} key={item.id} />
          ))}
        </div>
        <Button className="hidden w-full items-center gap-2 max-sm:flex" onClick={handleBucket}>
          <Plus className="h-4 w-4" />
          Tambah Bucket
        </Button>
      </div>

      <DialogFormBucket open={openBucket} onOpenChange={handleBucket} onRefresh={handleRefresh} />
    </>
  );
};

export default Home;
