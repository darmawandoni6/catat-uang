import { http } from '@util/network';

import type { InitialState } from '../types';

export async function fetchMe() {
  const { data } = await http.get<InitialState['me']>('/me');
  return data;
}

export async function removeBucket(id: number) {
  await http.delete(`/bucket/${id}`);
}

export async function removeTransaction() {
  await http.delete('/transaction');
}

export async function logout() {
  await http.post('/google-logout');
}
