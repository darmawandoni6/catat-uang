import { useEffect, useState } from 'react';

import { BarChart3, FileText, PlusCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useSetStateGlobal } from '@component/layout/hooks/use-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@component/ui/tabs';
import { toastError } from '@util/toast';

import Filter from './_components/filter';
import FormTransaksi from './_components/form-transaksi';
import Grafik from './_components/grafik';
import ListTransaksi from './_components/list-transaksi';
import Statistik from './_components/statistik';
import { getBucketId, getDashboard } from './repository/api';
import type { Dashboard, FilterReport, TransactionAPI } from './types';
import { onDashboard, onSummary, onYear } from './utils/helpers';

const Bucket = () => {
  const { id } = useParams();
  const setState = useSetStateGlobal();

  const [reportFilters, setReportFilters] = useState<FilterReport>('month');
  const [dt, setDt] = useState<Dashboard>({
    grafik: {},
    total_category: {},
    total_type: {},
  });
  const [list, setList] = useState<TransactionAPI[]>([]);
  const [filter, setFilter] = useState<TransactionAPI[]>([]);

  useEffect(() => {
    if (id) {
      fetchDashboard(id);
    }
  }, [id]);

  async function fetchDashboard(id: string) {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      const [bucket, res] = await Promise.all([getBucketId(id), getDashboard(id)]);
      setList(res);
      handleFilter(res, 'month');
      const summary = onSummary(res);
      setState(prev => ({ ...prev, summary, bucket }));
    } catch (error) {
      toastError(error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }

  const handleUpdateBalance = () => {};

  const handleFilter = (data: TransactionAPI[], type: FilterReport) => {
    const transaction = data.filter(item => onYear(new Date(item.date), type));
    const res = onDashboard(transaction, type);

    setDt(res);
    setReportFilters(type);
    setFilter(transaction);
  };

  const onUpdateData = (data: TransactionAPI) => {
    setList(prev => [...prev, data]);
    handleFilter([data, ...list], reportFilters);
  };
  return (
    <>
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
          <Filter type={reportFilters} onFilter={type => handleFilter(list, type)} />
          <Grafik data={dt.grafik} />
          <Statistik total_type={dt.total_type} total_category={dt.total_category} />
        </TabsContent>
        <TabsContent value="input" className="mt-4 space-y-4 max-sm:mt-2.5 max-sm:space-y-2.5">
          <FormTransaksi id={Number(id)} onUpdateBalance={handleUpdateBalance} onRefresh={onUpdateData} />
        </TabsContent>
        <TabsContent value="reports" className="mt-4 space-y-4 max-sm:mt-2.5 max-sm:space-y-2.5">
          <Filter type={reportFilters} onFilter={type => handleFilter(list, type)} />
          <ListTransaksi data={filter} />
        </TabsContent>
      </Tabs>
      {/* <ModalDialog
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
      <DialogFormBucket />
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
      /> */}
    </>
  );
};

export default Bucket;
