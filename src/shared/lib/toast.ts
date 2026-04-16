import { create } from 'zustand';
import axios from 'axios';
import type { ApiResponse } from '../types/api';

export type ToastVariant = 'error' | 'success' | 'info';

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastState {
  toasts: ToastItem[];
  push: (message: string, variant?: ToastVariant) => void;
  remove: (id: number) => void;
}

let toastId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (message, variant = 'info') => {
    const id = ++toastId;
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant }],
    }));

    window.setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3000);
  },
  remove: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));

export const showToast = (message: string, variant: ToastVariant = 'info') => {
  useToastStore.getState().push(message, variant);
};

export const showErrorToast = (message: string) => {
  showToast(message, 'error');
};

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiResponse<null>>(error)) {
    return error.response?.data?.error?.message ?? fallback;
  }

  return fallback;
};

export const showApiErrorToast = (error: unknown, fallback: string) => {
  showErrorToast(getApiErrorMessage(error, fallback));
};
