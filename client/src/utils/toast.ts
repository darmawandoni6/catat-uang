import { toast } from 'react-toastify';

export const toastSuccess = (message: string) => {
  toast.success(message);
};
export const toastError = (err: unknown) => {
  toast.error((err as Error).message);
};
