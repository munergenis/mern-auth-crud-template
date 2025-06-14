import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error) {
      const status: number = (error.response && error.response.status) ?? 500;
      const data: Record<string, string> =
        (error.response && error.response.data) ?? {};
      return Promise.reject({ status, ...data });
    } else {
      return Promise.reject({ status: 500 });
    }
  }
);

export default API;
