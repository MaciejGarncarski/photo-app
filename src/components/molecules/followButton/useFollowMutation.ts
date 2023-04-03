import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useUser } from '@/src/hooks/useUser';
import { apiClient } from '@/src/utils/apis/apiClient';

type FollowMutation = {
  userId: string;
};

export const useFollowMutation = ({ userId }: FollowMutation) => {
  const queryClient = useQueryClient();
  const { isFollowing, username } = useUser({ userId });

  return useMutation(
    async () => {
      if (isFollowing) {
        await apiClient.delete(`followers?followingUserId=${userId}`);
      }
      if (!isFollowing) {
        await apiClient.put('followers', {
          followingUserId: userId,
        });
      }
    },
    {
      onError: () => toast.error('Error, try again later.'),
      onSuccess: async () => {
        await queryClient.invalidateQueries(['account', userId]);
        await queryClient.invalidateQueries(['account', null, username]);
        await queryClient.invalidateQueries(['other-users']);
      },
    },
  );
};
