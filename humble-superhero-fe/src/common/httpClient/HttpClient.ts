import axios, { AxiosInstance } from 'axios';
import { Config } from '../config/Config';

export const HttpClient = (): AxiosInstance => {
  const http = axios.create({
    baseURL: Config.get('VITE_SERVER_API_URL'),
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  });
  return http;
};
