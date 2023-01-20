import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { clientEnv } from '@/utils/env.mjs';

export type Account = {
  isFollowing: boolean;
  user: User | null;
  count: {
    posts: number | null;
    followers: number | null;
    following: number | null;
  };
};

type UseAccount = {
  username?: string;
  userId?: string;
  isPrefetching?: boolean;
  authorData?: Account;
};

export const fetchAccount = async ({ userId, username, isPrefetching }: UseAccount) => {
  if (userId) {
    const { data } = await axios.get<Account>(
      `${isPrefetching ? clientEnv.NEXT_PUBLIC_API_ROOT : ''}/api/account/${userId}`,
    );
    return data;
  }

  if (username) {
    const { data } = await axios.get<Account>(
      `${isPrefetching ? clientEnv.NEXT_PUBLIC_API_ROOT : ''}/api/account/${username}?type=username`,
    );
    return data;
  }
};

export type UsernameToIdResponse = {
  message: string;
  data?: {
    id: string;
  };
};

export const useAccount = ({ userId, username, authorData }: UseAccount) => {
  const query = useQuery({
    queryKey: ['account', userId, username],
    queryFn: async () => {
      return await fetchAccount({ userId, username });
    },
    initialData: authorData,
    enabled: Boolean(userId) || Boolean(username),
  });

  return {
    ...query,
    account: query.data?.user,
    count: query.data?.count,
  };
};
