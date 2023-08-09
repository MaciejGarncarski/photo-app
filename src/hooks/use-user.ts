import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/src/services/user.service';

type Props = {
  userId: string;
};

export const useUser = ({ userId }: Props) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser({ userId }),
    enabled: userId !== '',
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
