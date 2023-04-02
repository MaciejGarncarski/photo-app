import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserApiResponse } from '@/src/pages/api/account/[user]';

export const useOtherUsers = () => {
  return useQuery({
    queryKey: ['other-users'],
    queryFn: async () => {
      const { data } = await axios.get<Array<UserApiResponse>>('/api/getOtherUsers');
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
