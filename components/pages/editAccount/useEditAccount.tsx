import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { SignUpSchemaData } from '@/components/molecules/completeSignUp/CompleteSignUp';

type EditAccountData = {
  image: Blob | null;
} & SignUpSchemaData;

export const useEditAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId, username, fullName, image, bio }: EditAccountData) => {
      return await axios.postForm<unknown, unknown, EditAccountData>('/api/account/edit', {
        userId,
        image,
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
