import type { IBookingWithDetails } from '@/interfaces';
import { create } from 'zustand';
export interface IBookingState {
  bookings: IBookingWithDetails[] | [];
  //isLoggedIn: boolean;
  // logout: () => void;
  setBooking: (bookings: IBookingWithDetails[] | []) => void;
}
// Create the Userstore hook in zustand

export const useBookingStore = create<IBookingState>((set) => ({
  bookings: [],
  // isLoggedIn: false,
  // Actions to update state
  setBooking: (payload: IBookingWithDetails[]) => set({ bookings: payload }),
  //logout: () => set({ user: null, isLoggedIn: false }),
}));
