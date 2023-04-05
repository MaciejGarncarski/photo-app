import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { apiClient } from '@/src/utils/apis/apiClient';

import { UserApiResponse } from '@/src/pages/api/account/userId/[userId]';

type Arguments = {
  username: string;
};

const fetchUserId = async (username: string) => {
  const { data } = await apiClient.get<UserApiResponse>(`account/username/${username}`);
  return data;
};

export const useUserByUsername = ({ username }: Arguments) => {
  return useQuery({
    queryKey: ['user', username],
    onError: () => {
      toast.error('Cannot fetch user');
    },
    queryFn: () => fetchUserId(username),
  });
};
