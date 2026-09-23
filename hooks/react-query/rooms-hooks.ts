import { fetchRooms, fetchRoomById } from '@/services/rooms';
import { useQuery } from '@tanstack/react-query';

//get rooms from a particular hotel
export function useHotelRooms(hotelId: string) {
  return useQuery({
    // Always include dependencies in the queryKey!
    queryKey: ['rooms-hotel', hotelId],
    // Wrap your function to pass parameters
    queryFn: () => fetchRooms(hotelId),
    // Since we look for the room detail, consider making it stale longer
    staleTime: 1000 * 60 * 120, // 120 minutes (2h) or 1440 for a day
  });
}

export function useRoomById(roomId: string) {
  return useQuery({
    // Always include dependencies in the queryKey!
    queryKey: ['room-detail-by-id', roomId],
    // Wrap your function to pass parameters
    queryFn: () => fetchRoomById(roomId),
    // Since we look for the hotel detail, consider making it stale longer
    staleTime: 1000 * 60 * 120, // 120 minutes (2h) or 1440 for a day
  });
}
