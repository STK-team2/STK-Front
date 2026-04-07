import { create } from 'zustand';

const readStoredToken = (key: 'accessToken' | 'refreshToken') => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(key);
};

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
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

  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken, isAuthenticated: true, isAuthReady: true });
  },

  setAccessToken: (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    set({ accessToken, isAuthenticated: true, isAuthReady: true });
  },

  setAuthReady: (isAuthReady) => {
    set({ isAuthReady });
  },

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ accessToken: null, refreshToken: null, isAuthenticated: false, isAuthReady: true });
  },
}));
