import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type AccountFromApi = {
  isFollowing: boolean;
  user: User | null;
  count: {
    posts: number | null;
    followers: number | null;
    following: number | null;
  };
};

type PropsTypes = {
  username?: string;
  userId?: string;
};

export const fetchAccount = async ({ userId, username }: PropsTypes) => {
  const url = '/api/account';

  if (userId) {
    const { data } = await axios.get<AccountFromApi>(`${url}/${userId}`);

    return data;
  }

  if (username) {
    const { data } = await axios.get<AccountFromApi>(`${url}/${username}?type=username`);
    return data;
  }
};

export type UsernameToIdResponse = {
  message: string;
  data?: {
    id: string;
  };
};

export const useUser = ({ userId, username }: PropsTypes) => {
  const query = useQuery({
    queryKey: ['account', userId, username],
    queryFn: async () => {
      return await fetchAccount({ userId, username });
    },
    enabled: Boolean(userId) || Boolean(username),
    refetchOnWindowFocus: false,
  });

  const user = query.data?.user;

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    isFollowing: Boolean(query.data?.isFollowing),
    ...user,
    followersCount: query.data?.count.followers || 0,
    friendsCount: query.data?.count.following || 0,
    postsCount: query.data?.count.posts || 0,
  };
};
