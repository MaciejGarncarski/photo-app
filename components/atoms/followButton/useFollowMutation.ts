import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useUser } from '@/hooks/useUser';

import { FollowersPutRequest } from '@/pages/api/followers';

export const useFollowMutation = (userId: string) => {
  const queryClient = useQueryClient();
  const { isFollowing, username } = useUser({ userId });

  return useMutation(
    async () => {
      try {
        if (isFollowing) {
          await axios.delete(`/api/followers?followingUserId=${userId}`);
        }
        if (!isFollowing) {
          await axios.put<unknown, null, FollowersPutRequest>('/api/followers', {
            followingUserId: userId,
          });
        }
      } catch (error) {
        toast.error('Error, try again later.');
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['account', userId, username]);
      },
    },
  );
};
