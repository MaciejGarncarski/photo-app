import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type Account = {
  isFollowing: boolean;
  user: User | null;
  count: {
    posts: number | null;
    followers: number | null;
    following: number | null;
  };
};

export const fetchAccount = async ({ userId, username }: UseAccount) => {
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

type UseAccount = {
  username?: string;
  userId?: string;
  authorData?: Account;
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
