import { create } from 'zustand'

export const userStore = create((set) => ({
  user: 1,
  setUser: (user) => set(() => ({ user })),
}))