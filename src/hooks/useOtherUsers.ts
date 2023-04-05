import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { UserApiResponse } from '@/src/pages/api/account/userId/[userId]';

export const useOtherUsers = () => {
  return useQuery({
    queryKey: ['other-users'],
    queryFn: async () => {
      const { data } = await apiClient.get<Array<UserApiResponse>>('getOtherUsers');
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
