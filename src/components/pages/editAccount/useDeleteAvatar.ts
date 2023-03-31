import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '@/hooks/useAuth';

import { DeleteAvatarData } from '@/pages/api/account/deleteAvatar';

export const useDeleteAvatar = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId }: DeleteAvatarData) => {
      return await axios.delete(`/api/account/deleteAvatar?userId=${userId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['account', session?.user?.id]);
      },
    },
  );
};
