import axios from 'axios';
import type { ErrorType, HttpResponseErrorType, ResponseBodyFailed } from '@/types/api.ts';
import { isUndefined, omitBy } from 'lodash';

const path = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: path,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login') &&
      !originalRequest.url.includes('/auth/registration') &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        await api.post('/auth/refresh');
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default api;

export const emptyResponse = () => undefined;

export const handleHttpError = (error: HttpResponseErrorType): ResponseBodyFailed => ({
  ok: false,
  error: omitBy<ErrorType>({
    code: error?.response?.status || 0,
    name: error?.response?.data?.name || 'error',
    message: error?.response?.data?.message || 'Uncaught server error, please try again later',
  }, isUndefined) as ErrorType,
});

