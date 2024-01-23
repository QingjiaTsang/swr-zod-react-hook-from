// import { getDomain } from '@/utils/server';
import axios, { AxiosRequestConfig } from 'axios';

// const domain = getDomain();

// console.log(`domain`, domain);

export const axiosInstance = axios.create({
  // baseURL: 'http://192.168.3.10:8004',
  // baseURL: domain,
  headers: {
    'Content-Type': 'application/json',
  },
});
