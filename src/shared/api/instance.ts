import axios from 'axios';
import { useAuthStore } from '../../entities/auth/model/authStore';
import { showErrorToast } from '../lib/toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

let refreshRequest: Promise<string> | null = null;

const requestAccessTokenRefresh = async (refreshToken: string) => {
  if (!refreshRequest) {
    refreshRequest = axios
      .post(`${API_BASE_URL}/auth/refresh`, { refreshToken })
      .then(({ data }) => {
        const newAccessToken = data.data.accessToken as string;
        useAuthStore.getState().setAccessToken(newAccessToken);
        return newAccessToken;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
};

instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken ?? localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as {
      _retry?: boolean;
      url?: string;
      headers: Record<string, string>;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      originalRequest?.url !== '/auth/refresh'
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        useAuthStore.getState().clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const newAccessToken = await requestAccessTokenRefresh(refreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch {
        useAuthStore.getState().clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 403) {
      useAuthStore.getState().clearTokens();
      showErrorToast(error.response?.data?.error?.message ?? '인증이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
