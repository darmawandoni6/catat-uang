import { useEffect, useState } from 'react';

import {
  AlertTriangle,
  BarChart3,
  CircleUserRound,
  FileText,
  LogOut,
  PlusCircle,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';

import ModalDialog from '@component/pop-up';
import { Button } from '@component/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@component/ui/tabs';
import { toastError, toastSuccess } from '@util/toast';

import Filter from './_components/filter';
import FormTransaksi from './_components/form-transaksi';
import Grafik from './_components/grafik';
import ListTransaksi from './_components/list-transaksi';
import Statistik from './_components/statistik';
import TotalCard from './_components/total-card';
import { dashboardTransaksi, getMe, listTransaksi, logout, remove } from './repository/api';
import type { DashboardTransaction, FilterReport, Me, TransactionList, TransactionsParams } from './types';
import { getGreeting } from './utils/time';

const Home = () => {
  const [reportFilters, setReportFilters] = useState<FilterReport>('month');
  const [dt, setDt] = useState<DashboardTransaction>({
    grafik: {},
    staticData: {
      totalCategory: {},
      totalType: {},
    },
  });
  const [{ me, summary }, setMe] = useState<Me>({
    me: {
      sub: '',
      email: '',
      name: '',
    },
    summary: {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
    },
  });
  const [params, setParams] = useState<TransactionsParams>({
    page: '1',
    pageSize: '20',
    type: 'month',
  });
  const [data, setData] = useState<TransactionList>({
    data: [],
    count: 0,
  });
  const [open, setOpen] = useState<'reset' | 'logout' | ''>('');

  useEffect(() => {
    firstLoad();
  }, []);

  function firstLoad() {
    fetchAPIDashboard('month');
    fetchAPIlist(params);
    getMe().then(res => {
      setMe(prev => ({ ...prev, ...res }));
    });
  }

  async function fetchAPIlist(params: TransactionsParams) {
    try {
      const res = await listTransaksi(params);
      setParams(params);
      setData(prev => ({
        count: res.count,
        data: params.page === '1' ? res.data : [...prev.data, ...res.data],
      }));
    } catch (error) {
      toastError(error);
    }
  }
  function fetchAPIDashboard(type: FilterReport) {
    dashboardTransaksi({ type })
      .then(res => setDt(res))
      .catch(err => toastError(err));
  }

  const handleRefresh = (type: FilterReport) => {
    setReportFilters(type);
    fetchAPIDashboard(type);
    fetchAPIlist({ ...params, page: '1', type });
  };

  const removeTransaction = async () => {
    try {
      await remove();
      firstLoad();
      toastSuccess('Success reset!');
    } catch (error) {
      toastError(error);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
      toastSuccess('Success reset!');
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="m-auto min-h-full max-w-3xl space-y-4 max-sm:space-y-2">
      <header className="flex items-center justify-between p-4 max-sm:p-2">
        <div className="flex items-center gap-2">
          <CircleUserRound className="size-10 text-gray-400 max-sm:size-9" />
          <section className="leading-normal">
            <h1 className="font-bold text-gray-900 capitalize max-sm:text-sm">{me.name}</h1>
            <p className="text-xs text-gray-400">{getGreeting()}</p>
          </section>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setOpen('reset')}>
            <RefreshCw className="size-10" />
          </Button>
          <Button variant="ghost" onClick={() => setOpen('logout')}>
            <LogOut className="size-10" />
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-4 px-4 max-sm:grid-cols-2 max-sm:gap-2 max-sm:px-2.5">
        <TotalCard
          className="max-sm:col-span-2"
          title="Total Saldo"
          icon={<Wallet className="text-muted-foreground h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          total={summary.balance}
          isUp={summary.balance >= 0}
        />
        <TotalCard
          title="Total Pemasukan"
          icon={<TrendingUp className="text-primary h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          isUp
          total={summary.totalIncome}
        />
        <TotalCard
          title="Total Pengeluaran"
          icon={<TrendingDown className="text-secondary h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          total={summary.totalExpense}
          isUp={false}
        />
      </div>
      <Tabs defaultValue="dashboard" className="w-full px-4 max-sm:mt-4 max-sm:px-2.5">
        <TabsList className="grid h-auto w-full grid-cols-3">
          <TabsTrigger
            value="dashboard"
            className="flex items-center gap-1 py-2 text-xs max-sm:gap-2 max-sm:py-3 max-sm:text-sm"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm max-sm:hidden">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="input"
            className="flex items-center gap-1 py-2 text-xs max-sm:gap-2 max-sm:py-3 max-sm:text-sm"
          >
            <PlusCircle className="h-4 w-4" />
            <span className="text-sm max-sm:hidden">Input Transaksi</span>
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="flex items-center gap-1 py-2 text-xs max-sm:gap-2 max-sm:py-3 max-sm:text-sm"
          >
            <FileText className="h-4 w-4" />
            <span className="text-sm max-sm:hidden">Laporan</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-4 space-y-4 max-sm:mt-2.5 max-sm:space-y-2.5">
          <Filter type={reportFilters} onRefresh={handleRefresh} />
          <Grafik data={dt.grafik} />
          <Statistik data={dt.staticData} />
        </TabsContent>
        <TabsContent value="input" className="mt-4 space-y-4 max-sm:mt-2.5 max-sm:space-y-2.5">
          <FormTransaksi onRefresh={() => handleRefresh(params.type)} />
        </TabsContent>
        <TabsContent value="reports" className="mt-4 space-y-4 max-sm:mt-2.5 max-sm:space-y-2.5">
          <Filter type={reportFilters} onRefresh={handleRefresh} />
          <ListTransaksi
            data={data.data}
            loadMore={data.data.length < data.count}
            params={params}
            onFetch={fetchAPIlist}
          />
        </TabsContent>
      </Tabs>
      <ModalDialog
        open={open === 'reset'}
        onOpenChange={() => setOpen('')}
        onReset={removeTransaction}
        icon={<AlertTriangle className="m-auto mb-6 size-10 text-orange-300" />}
        title="Reset Transaksi"
        description="Kamu yakin menghapus semua transaksi ?"
        footer={{
          no: 'Cancel',
          yes: 'Delete',
        }}
      />
      <ModalDialog
        open={open === 'logout'}
        onOpenChange={() => setOpen('')}
        onReset={handleLogout}
        icon={<LogOut className="m-auto mb-6 size-10 text-red-600" />}
        title="Logout Aplikasi"
        description="Kamu yakin keluar dari aplikasi ?"
        footer={{
          no: 'Cancel',
          yes: 'Ya',
        }}
      />

      <div className="py-3 text-center text-xs font-semibold">{`v${__APP_VERSION__}`}</div>
    </div>
  );
};

export default Home;
