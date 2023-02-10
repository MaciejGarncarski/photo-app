import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useUser } from '@/components/pages/account/useUser';

import { FollowersPutRequest } from '@/pages/api/followers';

export const useFollowMutation = (userId: string) => {
  const queryClient = useQueryClient();
  const { isFollowing } = useUser({ userId });

  return useMutation(
    async () => {
      if (isFollowing) {
        await axios.delete(`/api/followers?followingUserId=${userId}`);
      }
      if (!isFollowing) {
        await axios.put<unknown, null, FollowersPutRequest>('/api/followers', {
          followingUserId: userId,
        });
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['account', userId]);
      },
    },
  );
};
