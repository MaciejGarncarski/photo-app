import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';
import { clientEnv } from '@/src/utils/env';

export const useDeleteAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      return apiClient.delete(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/session-user/delete-avatar`, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
      },
    },
  );
};
