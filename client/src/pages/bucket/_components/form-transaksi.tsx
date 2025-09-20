import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import { CalendarIcon, FileTextIcon, MinusCircle, PlusCircle, TagIcon } from 'lucide-react';
import { toast } from 'react-toastify';

import { useSetStateGlobal } from '@component/layout/hooks/use-context';
import ModalDialog from '@component/pop-up';
import { Badge } from '@component/ui/badge';
import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { Input } from '@component/ui/input';
import { Label } from '@component/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@component/ui/select';
import { Textarea } from '@component/ui/textarea';
import { Separator } from '@radix-ui/react-select';
import { handleChangeCurrency, onlyNumber } from '@util/currency';
import { cn } from '@util/tn-merge';

import { createTransaksi } from '../repository/api';
import type { TransactionAPI, TransactionForm, TransactionPayload } from '../types';

const incomeCategories = ['Gaji', 'Freelance', 'Investasi', 'Bonus', 'Lainnya'];
const expenseCategories = ['Makanan', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 'Lainnya'];
const defaultState: TransactionForm = {
  type: 'expense',
  amount: '',
  category: 'Lainnya',
  description: '',
  date: new Date().toISOString().split('T')[0],
};

interface Props {
  id: number;
  onUpdateBalance: (type: 'income' | 'expense', value: number) => void;
  onRefresh: (data: TransactionAPI) => void;
}

const FormTransaksi: FC<Props> = ({ id, onRefresh, onUpdateBalance }) => {
  const setState = useSetStateGlobal();

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<TransactionForm>(defaultState);

  const isIncome = formData.type === 'income';

  const handleOpenChange = () => {
    if (loading) return;
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload: TransactionPayload = {
        type: formData.type,
        amount: Number(onlyNumber(formData.amount)),
        category: formData.category,
        description: formData.description,
        date: new Date(formData.date),
        bucket_id: id,
      };
      const res = await createTransaksi(payload);
      onRefresh(res);
      onUpdateBalance(formData.type, payload.amount);
      toast.success('success create');
      setFormData(defaultState);
      setState(prev => {
        const summary = prev.summary;
        if (payload.type === 'income') {
          summary.totalIncome += payload.amount;
        } else {
          summary.totalExpense += payload.amount;
        }
        summary.balance = summary.totalIncome - summary.totalExpense;

        return { ...prev, summary };
      });
      handleOpenChange();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAlert = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base max-sm:text-sm">Tambah Transaksi</CardTitle>
        <CardDescription className="text-sm max-sm:text-xs">Catat pemasukan atau pengeluaran baru</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOpenAlert} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={formData.type === 'income' ? 'default' : 'outline'}
              onClick={() => setFormData(prev => ({ ...prev, category: defaultState.category, type: 'income' }))}
              className="py-2 max-sm:text-xs"
            >
              <PlusCircle className="mr-1 h-3 w-3" />
              Pemasukan
            </Button>
            <Button
              type="button"
              variant={formData.type === 'expense' ? 'default' : 'outline'}
              onClick={() => setFormData(prev => ({ ...prev, category: defaultState.category, type: 'expense' }))}
              className="py-2 max-sm:text-xs"
            >
              <MinusCircle className="mr-1 h-3 w-3" />
              Pengeluaran
            </Button>
          </div>

          <div className="space-y-1">
            <Label htmlFor="amount" className="text-sm">
              Jumlah
            </Label>
            <Input
              id="amount"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: handleChangeCurrency(e) })}
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category" className="text-sm">
              Kategori
            </Label>
            <Select value={formData.category} onValueChange={value => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {(formData.type === 'income' ? incomeCategories : expenseCategories).map(category => (
                  <SelectItem key={category} value={category} className="text-sm">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="date" className="text-sm">
              Tanggal
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              required
              max={defaultState.date}
              className="inline-block text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm">
              Keterangan (Opsional)
            </Label>
            <Textarea
              id="description"
              placeholder="Tambahkan keterangan..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="resize-none text-sm"
            />
          </div>

          <Button type="submit" className="w-full py-2 text-sm">
            Tambah Transaksi
          </Button>
        </form>
      </CardContent>
      <ModalDialog
        open={open}
        onOpenChange={handleOpenChange}
        title={`Konfirmasi ${isIncome ? 'Pemasukan' : 'Pengeluaran'}`}
        description="Pastikan data transaksi sudah benar sebelum menyimpan."
        footer={
          <>
            <Button variant="outline" onClick={handleOpenChange} disabled={loading}>
              Batal
            </Button>
            <Button onClick={handleSubmit} loading={loading}>
              Konfirmasi & Simpan
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Amount */}
          <div className="py-4 text-center">
            <p className={cn(isIncome ? 'text-primary' : 'text-secondary', 'text-3xl font-bold')}>
              {isIncome ? '+' : '-'}
              {formData.amount}
            </p>
            <Badge variant={isIncome ? 'default' : 'destructive'} className="mt-2">
              {isIncome ? 'Pemasukan' : 'Pengeluaran'}
            </Badge>
          </div>

          <Separator />

          {/* Transaction Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <TagIcon className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-sm">Kategori</p>
                <p className="font-medium">{formData.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarIcon className="text-muted-foreground h-4 w-4" />
              <div>
                <p className="text-muted-foreground text-sm">Tanggal</p>
                <p className="font-medium">{formData.date}</p>
              </div>
            </div>

            {formData.description && (
              <div className="flex items-start gap-3">
                <FileTextIcon className="text-muted-foreground mt-0.5 h-4 w-4" />
                <div>
                  <p className="text-muted-foreground text-sm">Keterangan</p>
                  <p className="font-medium">{formData.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalDialog>
    </Card>
  );
};

export default FormTransaksi;
