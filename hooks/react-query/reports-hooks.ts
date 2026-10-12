import { useQuery } from '@tanstack/react-query';
import { getUserBookingsReport } from '@/services/bookings';
//get rooms from a particular hotel
export function useUSerReport(UserId: number) {
  return useQuery({
    // Always include dependencies in the queryKey!
    queryKey: ['user-reports', UserId],
    // Wrap your function to pass parameters
    queryFn: () => getUserBookingsReport(UserId),
    // Since we look for the room detail, consider making it stale longer
    staleTime: 1000 * 60 * 5, // 5 minutes ()
  });
}
