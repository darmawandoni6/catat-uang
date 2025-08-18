import { useState } from 'react';

import { MinusCircle, PlusCircle } from 'lucide-react';

import { Button } from '@component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@component/ui/card';
import { Input } from '@component/ui/input';
import { Label } from '@component/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@component/ui/select';
import { Textarea } from '@component/ui/textarea';

const incomeCategories = ['Gaji', 'Freelance', 'Investasi', 'Bonus', 'Lainnya'];
const expenseCategories = ['Makanan', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 'Lainnya'];

const FormTransaksi = () => {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = () => {};
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
              onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
              className="py-2 max-sm:text-xs"
            >
              <PlusCircle className="mr-1 h-3 w-3" />
              Pemasukan
            </Button>
            <Button
              type="button"
              variant={formData.type === 'expense' ? 'default' : 'outline'}
              onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
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
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
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
              className="text-sm"
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
    </Card>
  );
};

export default FormTransaksi;
