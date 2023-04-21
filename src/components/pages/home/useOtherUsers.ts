import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type User = {
  id: string;
  email: string | null;
  emailVerified: Date | null;
  name: string | null;
  password: string | null;
  username: string | null;
  bio: string | null;
  image: string | null;
  customImage: string | null;
  role: 'ADMIN' | 'USER';
  created_at: Date;
};

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
