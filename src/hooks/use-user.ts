import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/src/services/user.service';

type Props = {
  userId: string;
};

export const useUser = ({ userId }: Props) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data: user } = await getUser({ userId });

      if (!user['data']) {
        throw new Error('No user data.');
      }

      return user['data'];
    },
    enabled: userId !== '',
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });
};
