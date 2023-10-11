import axios, { AxiosError } from 'axios';
import { appStore } from '../stores/WithStore.tsx';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5296/',
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const e = error as AxiosError<{ message: string }>;
    if (e.response?.data?.message) {
      appStore.snackbarStore.showSnackBar(e.response?.data?.message);
    }
    throw error;
  },
);
