import { http } from '@util/network';

import type { DashboardTransaction, Me, TransactionList, TransactionPayload, TransactionsParams } from '../types';

export async function createTransaksi(payload: TransactionPayload) {
  await http.post('/transaction', payload);
}
export async function listTransaksi(params: TransactionsParams) {
  const { data } = await http.get<TransactionList>('/transaction', { params });
  return data;
}
export async function dashboardTransaksi(params: Pick<TransactionsParams, 'type'>) {
  const { data } = await http.get<DashboardTransaction>('/transaction-dashboard', { params });
  return data;
}

export async function getMe() {
  const { data } = await http.get<Me>('/me');
  return data;
}

export async function remove() {
  await http.delete('/transaction');
}
export async function logout() {
  await http.post('/google-logout');
}
