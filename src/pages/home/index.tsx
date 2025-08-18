import { BarChart3, CircleUserRound, FileText, PlusCircle, TrendingDown, TrendingUp, Wallet } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@component/ui/tabs';

import Filter from './_components/filter';
import FormTransaksi from './_components/form-transaksi';
import Grafik from './_components/grafik';
import ListTransaksi from './_components/list-transaksi';
import Statistik from './_components/statistik';
import TotalCard from './_components/total-card';

const Home = () => {
  return (
    <div className="m-auto mb-6 min-h-full max-w-3xl space-y-4 max-sm:space-y-2">
      <header className="flex p-4 max-sm:p-2">
        <div className="flex items-center gap-2">
          <CircleUserRound className="size-10 text-gray-400 max-sm:size-9" />
          <section className="leading-normal">
            <h1 className="font-bold text-gray-900 max-sm:text-sm">Doni Darmawan</h1>
            <p className="text-xs text-gray-400">Selamat Sore</p>
          </section>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-4 px-4 max-sm:grid-cols-2 max-sm:gap-2 max-sm:px-2.5">
        <TotalCard
          className="max-sm:col-span-2"
          title="Total Saldo"
          icon={<Wallet className="text-muted-foreground h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          total={0}
          isUp
        />
        <TotalCard
          title="Total Pemasukan"
          icon={<TrendingUp className="text-primary h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          isUp
          total={0}
        />
        <TotalCard
          title="Total Pengeluaran"
          icon={<TrendingDown className="text-secondary h-3 w-3 max-sm:h-4 max-sm:w-4" />}
          total={0}
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
            <span className="text-sm max-sm:hidden">Create Transition</span>
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="flex items-center gap-1 py-2 text-xs max-sm:gap-2 max-sm:py-3 max-sm:text-sm"
          >
            <FileText className="h-4 w-4" />
            <span className="text-sm max-sm:hidden">Reports</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-4 space-y-4 max-sm:mt-2.5 max-sm:space-y-2.5">
          <Filter />
          <Grafik />
          <Statistik />
        </TabsContent>
        <TabsContent value="input" className="mt-4 space-y-4 max-sm:mt-2.5 max-sm:space-y-2.5">
          <FormTransaksi />
        </TabsContent>
        <TabsContent value="reports" className="mt-4 space-y-4 max-sm:mt-2.5 max-sm:space-y-2.5">
          <Filter />
          <ListTransaksi />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
