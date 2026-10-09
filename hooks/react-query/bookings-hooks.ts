import { useQuery } from '@tanstack/react-query';

import { checkRoomAvailability, getUserBookings } from '@/services/bookings';

//get rooms availability
/* old version that didn't handle pending while waiting for dates to be selected 
export function useRoomCheckAvailability(
  datesRequired: string[],
  roomId: string,
) {
  return useQuery({
    // Always include dependencies in the queryKey!
    queryKey: ['room-availability', datesRequired, roomId],
    // Wrap your function to pass parameters
    queryFn: () => checkRoomAvailability(datesRequired, roomId),
    // Since we look for the room detail, consider making it stale longer
    staleTime: 1000 * 60 * 120, // 120 minutes (2h) or 1440 for a day
  });
} */
//the below version was too complicated just to check for the availability of a room, pattern to avoid next time at all cost
export function useRoomCheckAvailability(
  datesRequired: string[] | undefined | null, // Allow dates to be missing initially
  roomId: string,
) {
  // Check if we have valid dates to run the query
  const hasDatesSelected =
    Array.isArray(datesRequired) && datesRequired.length > 0;

  return useQuery({
    queryKey: ['room-availability', datesRequired, roomId],
    // Cast non-null assertions inside queryFn since it only runs when enabled is true
    queryFn: () => checkRoomAvailability(datesRequired!, roomId),
    staleTime: 1000 * 60 * 120, // 2 hours

    // 🚀 The Magic: The query remains in an 'idle' state until this is true
    enabled: hasDatesSelected && !!roomId,
  });
}
//get user bookings
export function useRoomBookings(userId: number) {
  return useQuery({
    // Always include dependencies in the queryKey!
    queryKey: ['user-bookings', userId],
    // Wrap your function to pass parameters
    queryFn: () => getUserBookings(userId),

    // Since we look for the room detail, consider making it stale longer
    staleTime: 1000 * 60 * 120, // 120 minutes (2h) or 1440 for a day
  });
}
