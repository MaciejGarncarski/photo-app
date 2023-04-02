import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { EditAccountData } from '@/src/pages/api/account/edit';

export const useEditAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId, username, fullName, newAvatarUrl, bio }: EditAccountData) => {
      return await axios.post<unknown, unknown, EditAccountData>('/api/account/edit', {
        userId,
        newAvatarUrl,
        bio,
        username,
        fullName,
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['account']);
      },
    },
  );
};
