import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { UserApiResponse } from '@/src/pages/api/account/[user]';

type PropsTypes = {
  username?: string;
  userId?: string;
};

export const fetchAccount = async ({ userId, username }: PropsTypes) => {
  if (userId) {
    const { data } = await apiClient.get<UserApiResponse>(`account/${userId}`);
    return data;
  }

  if (username) {
    const { data } = await apiClient.get<UserApiResponse>(`account/${username}?type=username`);
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

  const user = query.data;

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    ...user,
  };
};
