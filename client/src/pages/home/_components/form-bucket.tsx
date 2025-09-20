import type { FormEvent } from 'react';
import { type FC, useEffect, useState } from 'react';

import ModalDialog from '@component/pop-up';
import { Button } from '@component/ui/button';
import { Input } from '@component/ui/input';
import { Label } from '@component/ui/label';
import { Textarea } from '@component/ui/textarea';
import { formatCurrency, handleChangeCurrency, onlyNumber } from '@util/currency';
import { toastError, toastSuccess } from '@util/toast';

import { addBucket, updateBucket } from '../repository/api';
import type { BucketAPI, BucketForm, BucketPayload } from '../types';

interface Props {
  open: boolean;
  data?: BucketAPI;
  onOpenChange: () => void;
  onRefresh?: (data: BucketAPI) => void;
}
const DialogFormBucket: FC<Props> = ({ open, data, onOpenChange, onRefresh }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<BucketForm>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (data) {
      setForm(prev => ({
        ...prev,
        name: data.name,
        description: data.description,
        target: data.target > 0 ? formatCurrency(data.target) : undefined,
      }));
    }
  }, [data]);

  const handleOpenChange = () => {
    if (isLoading) return;
    onOpenChange();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res: BucketAPI | undefined = undefined;

      const payload: BucketPayload = {
        name: form.name.trim(),
        description: form.description.trim(),
      };

      if (form.target) {
        payload.target = Number(onlyNumber(form.target));
      }
      if (data) {
        payload.id = data.id;
        res = await updateBucket(payload);
      } else {
        await addBucket(payload);
      }

      toastSuccess('success create bucket');
      if (res && onRefresh) onRefresh(res);
      handleOpenChange();
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={data ? 'Edit Bucket' : 'Tambah Bucket Baru'}
      description={data ? 'Update target tabungan' : 'Buat target tabungan baru'}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="bucketName">Nama Bucket</Label>
          <Input
            id="bucketName"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Contoh: Dana Darurat"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAmount" optional>
            Target Jumlah
          </Label>
          <Input
            id="targetAmount"
            type="text"
            inputMode="numeric"
            value={form.target}
            onChange={e => setForm(prev => ({ ...prev, target: handleChangeCurrency(e) }))}
            placeholder="ex: Rp5.000.0000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bucketDescription">Deskripsi</Label>
          <Textarea
            id="bucketDescription"
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Deskripsi bucket..."
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleOpenChange} disabled={isLoading}>
            Batal
          </Button>
          <Button type="submit" loading={isLoading}>
            Submit Bucket
          </Button>
        </div>
      </form>
    </ModalDialog>
  );
};

export default DialogFormBucket;
