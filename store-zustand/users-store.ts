// We will be using zustand for global local state management  instead of redux or react context API
import { create } from 'zustand';
import { IUser } from '@/interfaces';

export interface IUsersState {
  user: IUser | null;
  isLoggedIn: boolean;
  logout: () => void;
  setUser: (user: IUser | null) => void;
}
// Create the Userstore hook in zustand
export const useUsersStore = create<IUsersState>((set) => ({
  user: null,
  isLoggedIn: false,
  // Actions to update state
  setUser: (payload: IUser | null) => set({ user: payload, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
