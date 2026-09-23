import { supabase } from '@/api/supabase-config';

import { IHotel } from '@/interfaces';

export const fetchActiveHotels = async (): Promise<IHotel[]> => {
  // Select all rows and columns from the hotel table
  const { data: hotelData, error: dbError } = await supabase
    .from('hotels')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (dbError) throw dbError; // Strictly throw to notify TanStack Query
  return hotelData;
};

export const fetchActiveHotelById = async (
  hotelId: string,
): Promise<IHotel> => {
  // Select all rows and columns from the hotel table
  const { data: hotelData, error: dbError } = await supabase
    .from('hotels')
    .select('*')
    .eq('id', hotelId)
    .single(); // return a single object, not array which is the default

  if (dbError) throw dbError; // Strictly throw to notify TanStack Query
  return hotelData as IHotel;
};
