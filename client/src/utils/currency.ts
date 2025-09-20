import type { ChangeEvent } from 'react';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s/g, '');
};

export const handleChangeCurrency = (e: ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;

  value = onlyNumber(value);
  e.target.value = formatCurrency(Number(value));
  return formatCurrency(Number(value));
};

export function onlyNumber(value: string) {
  return value.replace(/[^0-9]/g, '');
}
