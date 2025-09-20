import { type FC, type ReactNode, useEffect, useState } from 'react';

import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import Loading from '@component/loading';
import TotalCard from '@page/home/_components/total-card';

import HeaderBucket from './_component/header-bucket';
import HeaderMain from './_component/header-main';
import { useStateGlobal } from './hooks/use-context';

interface Props {
  children: ReactNode;
}
const MainLayout: FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const state = useStateGlobal();

  const [isBucket, setBucket] = useState<boolean>(false);

  useEffect(() => {
    setBucket(pathname.startsWith('/bucket'));
  }, [pathname]);

  return (
    <div className="m-auto grid min-h-full max-w-3xl grid-rows-[auto_auto_1fr_auto] space-y-4 max-sm:space-y-2">
      {state.isLoading && <Loading className="fixed inset-0 bg-gray-900/20" />}
      {isBucket ? <HeaderBucket /> : <HeaderMain me={state.me} />}

      <div className="grid grid-cols-3 gap-4 px-4 max-sm:grid-cols-2 max-sm:gap-2 max-sm:px-2.5">
        <TotalCard
          className="max-sm:col-span-2"
          title="Total Saldo"
          icon={<Wallet className="text-muted-foreground h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          total={state.summary.balance}
          isUp={state.summary.balance >= 0}
        />
        <TotalCard
          title="Total Pemasukan"
          icon={<TrendingUp className="text-primary h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          isUp
          total={state.summary.totalIncome}
        />
        <TotalCard
          title="Total Pengeluaran"
          icon={<TrendingDown className="text-secondary h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          total={state.summary.totalExpense}
          isUp={false}
        />
      </div>
      {children}
      <div className="py-3 text-center text-xs font-semibold">{`v${__APP_VERSION__}`}</div>
    </div>
  );
};

export default MainLayout;
