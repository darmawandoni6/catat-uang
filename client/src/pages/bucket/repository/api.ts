import type { BucketAPI } from '@page/home/types';
import { http } from '@util/network';

import type { TransactionAPI, TransactionPayload } from '../types';

export async function getBucketId(id: string) {
  const res = await http.get<BucketAPI>(`/bucket/${id}`);
  return res.data;
}

export async function getDashboard(id: string) {
  const res = await http.get<TransactionAPI[]>(`/transaction-dashboard/${id}`);
  return res.data;
}

export async function createTransaksi(payload: TransactionPayload) {
  const res = await http.post<TransactionAPI>('/transaction', payload);
  return res.data;
}
