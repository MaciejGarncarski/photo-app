import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { getUserByUsername } from '@/src/services/user.service';

type Arguments = {
  username: string;
};

export const useUserByUsername = ({ username }: Arguments) => {
  return useQuery({
    queryKey: ['user', username],
    onError: () => {
      toast.error('Cannot fetch user');
    },
    queryFn: () => getUserByUsername({ username }),
    enabled: Boolean(username),
  });
};
