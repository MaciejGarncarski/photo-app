import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { fetchAccount } from '@/src/utils/fetchers/fetchers';

type PropsTypes = {
  userId: string;
};

export const useUser = ({ userId }: PropsTypes) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchAccount(userId),
    onError: () => {
      toast.error('Cannot fetch user');
    },
    enabled: Boolean(userId),
    refetchOnWindowFocus: false,
  });
};
