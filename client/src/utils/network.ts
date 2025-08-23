import type { AxiosError, AxiosInstance } from 'axios';
import axios from 'axios';

export const http: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

http.interceptors.response.use(
  response => response,
  error => {
    const err = error as AxiosError<{ message: string }>;

    if (err.status === 401) {
      window.location.href = '/login';
    }
    if (err.response?.data) {
      err.message = err.response?.data?.message ?? err.message;
    }

    return Promise.reject(error);
  },
);
