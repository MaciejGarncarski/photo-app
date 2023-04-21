import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { clientEnv } from '@/src/utils/env';

export const useOtherUsers = () => {
  return useQuery({
    queryKey: ['other-users'],
    queryFn: async () => {
      const { data } = await axios.get<Array<User>>(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/home/newest-users`, {
        withCredentials: true,
      });
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
