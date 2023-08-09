import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useUser } from '@/src/hooks/use-user';

import { followOtherUser } from '@/src/services/user.service';

type FollowMutation = {
  userId: string;
};

export const useFollowMutation = ({ userId }: FollowMutation) => {
  const queryClient = useQueryClient();
  const { data } = useUser({ userId });

  return useMutation(followOtherUser, {
    onError: () => toast.error('Error, try again later.'),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user', userId]);
      await queryClient.invalidateQueries(['user', data?.username]);
      await queryClient.invalidateQueries(['other-users']);
      await queryClient.invalidateQueries(['session']);
    },
  });
};
