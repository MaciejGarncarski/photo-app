import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useOtherUsers = () => {
  return useQuery({
    queryKey: ['other-users'],
    queryFn: async () => {
      const { data } = await axios.get<User[]>('/api/getOtherUsers');
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
