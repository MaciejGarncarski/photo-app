import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type UseAccount = {
  username?: string;
  userId?: string;
};

type Account = {
  isFollowing: boolean;
  status: number;
  user: User;
  count: {
    posts: number | null;
    followers: number | null;
    following: number | null;
  };
};

const fetchAccount = async ({ userId, username }: UseAccount) => {
  if (username) {
    const { data } = await axios.get<Account>(`/api/account/${username}?type=username`);
    return data;
  }

  const { data } = await axios.get<Account>(`/api/account/${userId}`);
  return data;
};

export type UsernameToIdResponse = {
  message: string;
  data?: {
    id: string;
  };
};

export const useAccount = ({ userId, username }: UseAccount) => {
  const query = useQuery({
    queryKey: ['account', userId, username],
    queryFn: async () => {
      return fetchAccount({ userId, username });
    },
    enabled: Boolean(userId) || Boolean(username),
  });

  return {
    ...query,
    account: query.data?.user,
    count: query.data?.count,
    status: query.data?.status,
  };
};
