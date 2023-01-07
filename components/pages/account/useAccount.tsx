import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type UseAccount = {
  username?: string;
  userId?: string;
};

const fetchAccount = async ({ userId, username }: UseAccount) => {
  if (username) {
    const { data } = await axios.get(`/api/account/${username}?type=username`);
    return data;
  }

  const { data } = await axios.get(`/api/account/${userId}`);
  return data;
};

type UseAccountResponse = {
  isFollowing: boolean;
  status: number;
  user: User;
  count: {
    posts: number | null;
    followers: number | null;
    following: number | null;
  };
};

export type UsernameToIdResponse = {
  message: string;
  data?: {
    id: string;
  };
};

export const useAccount = ({ userId, username }: UseAccount) => {
  const query = useQuery<UseAccountResponse>({
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
