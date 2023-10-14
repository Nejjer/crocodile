import axios, { AxiosError } from 'axios';
import { appStore } from '../stores/WithStore.tsx';
import { API_PATH } from '../constants.ts';

export const axiosInstance = axios.create({
  baseURL: API_PATH,
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

export interface IConnectionInfo {
  connectionId: string;
  roomId: string;
}
