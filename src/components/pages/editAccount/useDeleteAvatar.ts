import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/useAuth';
import { apiClient } from '@/src/utils/apis/apiClient';

import { DeleteAvatarData } from '@/src/pages/api/account/deleteAvatar';

export const useDeleteAvatar = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId }: DeleteAvatarData) => {
      return await apiClient.delete(`account/deleteAvatar?userId=${userId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', session?.user?.id]);
      },
    },
  );
};
