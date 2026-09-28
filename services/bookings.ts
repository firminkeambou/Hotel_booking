import { supabase } from '@/api/supabase-config';

import { IBookings } from '@/interfaces'; //: Promise<IHotel[]>

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
