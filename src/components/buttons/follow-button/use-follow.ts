import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@/src/hooks/use-user';

import {
  followOtherUser,
  unfollowOtherUser,
} from '@/src/services/user.service';

type FollowMutation = {
  userId: string;
};

export const useFollowMutation = ({ userId }: FollowMutation) => {
  const queryClient = useQueryClient();
  const { data } = useUser({ userId });

  return useMutation({
    mutationFn: () => {
      if (data?.isFollowing) {
        return unfollowOtherUser({ userId });
      }

      return followOtherUser({ userId });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', userId] });
      await queryClient.invalidateQueries({
        queryKey: ['user', data?.username],
      });
      await queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
