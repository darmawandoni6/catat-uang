import type { ChangeEvent } from 'react';

export const handleChangeCurrency = (e: ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;

  value = onlyNumber(value);
  e.target.value = formatRupiah(Number(value));
  return formatRupiah(Number(value));
};

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, '');
}

export function onlyNumber(value: string) {
  return value.replace(/[^0-9]/g, '');
}
