import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../../entities/auth/model/authStore';
import type { RefreshTokenResponse } from '../../entities/auth/types';
import { showErrorToast } from '../lib/toast';
import type { ApiResponse } from '../types/api';

const resolveApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  return configuredBaseUrl ? configuredBaseUrl.replace(/\/$/, '') : '/api';
};

const API_BASE_URL = resolveApiBaseUrl();

export const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

let refreshRequest: Promise<string> | null = null;

const AUTH_BYPASS_PATHS = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/send-verification-code',
  '/auth/verify-email',
  '/auth/refresh',
];

const isBypassedAuthRequest = (url?: string) =>
  AUTH_BYPASS_PATHS.some((path) => url === path || url?.endsWith(path));

const getStoredRefreshToken = () =>
  useAuthStore.getState().refreshToken ?? localStorage.getItem('refreshToken');

const requestAccessTokenRefresh = async (refreshToken: string) => {
  if (!refreshRequest) {
    refreshRequest = axios
      .post<ApiResponse<RefreshTokenResponse>>(
        `${API_BASE_URL}/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(({ data }) => {
        if (!data.success || !data.data?.accessToken) {
          throw new Error('Access token refresh failed');
        }

        const newAccessToken = data.data.accessToken;
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
    const originalRequest = (error as AxiosError).config as
      | (InternalAxiosRequestConfig & {
      _retry?: boolean;
    })
      | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest?._retry &&
      !isBypassedAuthRequest(originalRequest?.url)
    ) {
      originalRequest._retry = true;

      const refreshToken = getStoredRefreshToken();
      if (!refreshToken) {
        useAuthStore.getState().clearTokens();
        showErrorToast('인증이 만료되었습니다. 다시 로그인해주세요.');
        return Promise.reject(error);
      }

      try {
        const newAccessToken = await requestAccessTokenRefresh(refreshToken);
        originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
        return instance(originalRequest);
      } catch {
        useAuthStore.getState().clearTokens();
        showErrorToast('인증이 만료되었습니다. 다시 로그인해주세요.');
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 403 && !isBypassedAuthRequest(originalRequest?.url)) {
      useAuthStore.getState().clearTokens();
      showErrorToast(error.response?.data?.error?.message ?? '인증이 만료되었습니다. 다시 로그인해주세요.');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
