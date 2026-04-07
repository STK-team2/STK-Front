import { create } from 'zustand';
import type { MovementType } from '../types';

interface MovementFilterState {
  type: MovementType | undefined;
  from: string;
  to: string;
  query: string;
  setType: (type: MovementType | undefined) => void;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setQuery: (query: string) => void;
  reset: () => void;
}

export const useMovementFilterStore = create<MovementFilterState>((set) => ({
  type: undefined,
  from: '',
  to: '',
  query: '',
  setType: (type) => set({ type }),
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  setQuery: (query) => set({ query }),
  reset: () => set({ type: undefined, from: '', to: '', query: '' }),
}));
