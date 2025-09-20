export interface BucketForm {
  name: string;
  target?: string;
  description: string;
}
export interface BucketPayload {
  id?: number;
  name: string;
  target?: number;
  description: string;
}
export interface BucketList {
  id: string;
  name: string;
  target: number;
  description: string;
}

export interface BucketAPI {
  id: number;
  name: string;
  description: string;
  target: number;
  total_balance: number;
  total_expense: number;
  total_income: number;
  created_at: string;
  updated_at: string;
  user_sub: string;
}
