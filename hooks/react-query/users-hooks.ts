import { useQuery } from '@tanstack/react-query';
import { getLoggedInUser } from '@/services/users';

export function useCurrentProfile() {
  return useQuery({
    queryKey: ['current-user-profile'],
    queryFn: getLoggedInUser,
    // Since this looks up the active user profile, consider making it stale less often
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}
