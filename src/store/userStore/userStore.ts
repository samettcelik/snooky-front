// userStore.ts
import { create } from 'zustand';

interface AuthState {
  user: { api_token: string } | null;
  setUser: (user: { api_token: string }) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
