import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { EditAccountData } from '@/src/pages/api/account/edit';

export const useEditAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ userId, username, fullName, newAvatarUrl, bio }: EditAccountData) => {
      return apiClient.post<unknown, unknown, EditAccountData>('/account/edit', {
        userId,
        newAvatarUrl,
        bio,
        username,
        fullName,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
      },
    },
  );
};
