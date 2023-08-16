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

  return useMutation({
    mutationFn: followOtherUser,
    onError: () => toast.error('Error, try again later.'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', userId] });
      await queryClient.invalidateQueries({
        queryKey: ['user', data?.username],
      });
      await queryClient.invalidateQueries({ queryKey: ['other-users'] });
      await queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
