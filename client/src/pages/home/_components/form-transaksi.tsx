import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import { MinusCircle, PlusCircle } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { Input } from '@component/ui/input';
import { Label } from '@component/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@component/ui/select';
import { Textarea } from '@component/ui/textarea';

import { createTransaksi } from '../repository/api';
import type { TransactionForm, TransactionPayload } from '../types';
import { handleChangeCurrency, onlyNumber } from '../utils/currency';

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
  onRefresh: VoidFunction;
}

const FormTransaksi: FC<Props> = ({ onRefresh }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TransactionForm>(defaultState);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: TransactionPayload = {
        type: formData.type,
        amount: Number(onlyNumber(formData.amount)),
        category: formData.category,
        description: formData.description,
        date: new Date(formData.date),
      };
      await createTransaksi(payload);
      onRefresh();
      toast.success('success create');
      setFormData(defaultState);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base max-sm:text-sm">Tambah Transaksi</CardTitle>
        <CardDescription className="text-sm max-sm:text-xs">Catat pemasukan atau pengeluaran baru</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={formData.type === 'income' ? 'default' : 'outline'}
              onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
              className="py-2 max-sm:text-xs"
            >
              <PlusCircle className="mr-1 h-3 w-3" />
              Pemasukan
            </Button>
            <Button
              type="button"
              variant={formData.type === 'expense' ? 'default' : 'outline'}
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
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

          <Button type="submit" className="w-full py-2 text-sm" loading={loading}>
            Tambah Transaksi
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormTransaksi;
