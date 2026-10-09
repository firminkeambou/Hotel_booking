import { supabase } from '@/api/supabase-config';

import { IBookings, IBookingWithDetails, IHotel, IRoom } from '@/interfaces'; //: Promise<IHotel[]>

export const checkRoomAvailability = async (
  datesRequired: string[],
  roomId: string,
) => {
  // Select all rows and columns from the hotel table
  const { data: bookings, error: dbError } = await supabase
    .from('bookings')
    .select('*')
    .overlaps('booked_dates', datesRequired)
    .neq('status', 'cancelled')
    .eq('room_id', roomId);

  if (dbError) throw dbError; // Strictly throw to notify TanStack Query
  return bookings;
};

// save Booking, as a ponctual booking, we won't uss reacr-query to manage the cache, we will just invalidate the cache after the booking is saved
export const saveBooking = async (bookingData: Partial<IBookings>) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select('*')
      .single();
    if (error) throw new Error(error.message); // Strictly throw to notify TanStack Query just in case we use it
    return { success: true, data };
  } catch (error) {
    console.error('Error saving booking:', error);
    return { success: false, error: (error as Error).message };
    //throw error; // Rethrow the error to be handled by the caller, this matters if react-query
  }
};

export const getUserBookings = async (userId: number) => {
  // Select all rows and columns from the hotel table
  const { data: booking, error: dbError } = await supabase
    .from('bookings')
    .select('*,room:rooms(*),hotel:hotels(*)')
    .eq('customer_id', userId)
    .neq('status', 'cancelled')
    .order('created_at', { ascending: false });

  if (dbError) throw dbError; // Strictly throw to notify TanStack Query
  return booking as IBookingWithDetails[]; // Type assertion to include room and hotel
};

