import { useQuery } from '@tanstack/react-query';

import { getNewestUsers } from '@/src/services/other.service';

export const useOtherUsers = () => {
  return useQuery({
    queryKey: ['other-users'],
    queryFn: getNewestUsers,
    refetchOnWindowFocus: false,
  });
};
