import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/src/services/user.service';

type PropsTypes = {
  userId: string;
};

export const useUser = ({ userId }: PropsTypes) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser({ userId }),
    enabled: userId !== '',
    refetchOnWindowFocus: false,
  });
};
