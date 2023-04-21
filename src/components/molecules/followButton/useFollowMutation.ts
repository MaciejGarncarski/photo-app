import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useUser } from '@/src/hooks/useUser';
import { apiClient } from '@/src/utils/apis/apiClient';
import { clientEnv } from '@/src/utils/env';

type FollowMutation = {
  userId: string;
};

export const useFollowMutation = ({ userId }: FollowMutation) => {
  const queryClient = useQueryClient();
  const { data } = useUser({ userId });

  return useMutation(
    () => {
      if (data?.isFollowing) {
        return apiClient.delete(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/users/follow/${userId}`, {
          withCredentials: true,
        });
      }
      return apiClient.put(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/users/follow/${userId}`, { withCredentials: true });
    },
    {
      onError: () => toast.error('Error, try again later.'),
      onSuccess: async () => {
        await queryClient.invalidateQueries(['user', userId]);
        await queryClient.invalidateQueries(['user', data?.username]);
        await queryClient.invalidateQueries(['other-users']);
        await queryClient.invalidateQueries(['session']);
      },
    },
  );
};
