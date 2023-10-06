import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5296/',
  timeout: 10000,
});
