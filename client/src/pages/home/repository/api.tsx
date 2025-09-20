import type { InitialState } from '@component/layout/types';
import { http } from '@util/network';

import type { BucketAPI, BucketPayload } from '../types';

export async function getBucket(): Promise<BucketAPI[]> {
  const res = await http.get<BucketAPI[]>('/bucket');
  return res.data;
}
export async function addBucket(payload: BucketPayload) {
  await http.post('/bucket', payload);
}

export async function updateBucket(payload: BucketPayload) {
  const res = await http.put<BucketAPI>('/bucket', payload);
  return res.data;
}

export async function fetchMe() {
  const { data } = await http.get<InitialState['me']>('/me');
  return data;
}
