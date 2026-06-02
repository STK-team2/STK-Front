import { create } from 'zustand';
import { extractRoleFromToken } from '../../../shared/lib/jwt';
import type { UserRole } from '../../user/types';

const readStoredToken = (key: 'accessToken' | 'refreshToken') => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  role: UserRole | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  setAuthReady: (isAuthReady: boolean) => void;
  clearTokens: () => void;
}

const initialAccessToken = readStoredToken('accessToken');
const initialRefreshToken = readStoredToken('refreshToken');

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  isAuthenticated: Boolean(initialAccessToken || initialRefreshToken),
  isAuthReady: false,
  role: initialAccessToken ? extractRoleFromToken(initialAccessToken) : null,

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isAuthReady: true,
      role: extractRoleFromToken(accessToken),
    });
  },

  setAccessToken: (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    set({
      accessToken,
      isAuthenticated: true,
      isAuthReady: true,
      role: extractRoleFromToken(accessToken),
    });
  },

  setAuthReady: (isAuthReady) => {
    set({ isAuthReady });
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ accessToken: null, refreshToken: null, isAuthenticated: false, isAuthReady: true, role: null });
  },
}));
