import axios from 'axios';

export const request = axios.create({
  baseURL: 'https://api.example.edu.cn',
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  const token = globalThis.__JXT_TOKEN__;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
