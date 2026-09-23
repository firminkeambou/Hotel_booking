import { useQuery } from '@tanstack/react-query';
import { fetchActiveHotels, fetchActiveHotelById } from '@/services/hotels';

export function useApprovedHotels() {
  return useQuery({
    queryKey: ['approved-hotels'],
    queryFn: fetchActiveHotels,
    // Since this looks up the active user profile, consider making it stale less often
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

export function useApprovedHotelById(hotelId: string) {
  return useQuery({
    // Always include dependencies in the queryKey!
    queryKey: ['approved-hotel-by-id', hotelId],
    // Wrap your function to pass parameters
    queryFn: () => fetchActiveHotelById(hotelId),
    // Since we look for the hotel detail, consider making it stale longer
    staleTime: 1000 * 60 * 120, // 120 minutes (2h) or 1440 for a day
  });
}
