import { supabase } from '@/api/supabase-config';

import { IRoom } from '@/interfaces';

export const fetchRooms = async (hotelId: string): Promise<IRoom[]> => {
  // Select all rows and columns from the hotel table
  const { data: roomsData, error: dbError } = await supabase
    .from('rooms')
    .select('*')
    .eq('hotel_id', hotelId)
    .order('created_at', { ascending: false });

  if (dbError) throw dbError; // Strictly throw to notify TanStack Query
  return roomsData;
};

export const fetchRoomById = async (roomId: string): Promise<IRoom> => {
  // Select all rows and columns from the hotel table
  const { data: roomData, error: dbError } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId)
    .single(); // return a single object, not array which is the default

  if (dbError) throw dbError; // Strictly throw to notify TanStack Query
  return roomData as IRoom;
};
