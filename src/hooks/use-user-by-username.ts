import { useQuery } from '@tanstack/react-query';

import { getUserByUsername } from '@/src/services/user.service';

type Arguments = {
  username: string;
};

export const useUserByUsername = ({ username }: Arguments) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserByUsername({ username }),
    enabled: Boolean(username) && username !== '',
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
