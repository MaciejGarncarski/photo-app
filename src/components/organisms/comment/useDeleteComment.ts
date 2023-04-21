import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { apiClient } from '@/src/utils/apis/apiClient';

type Mutation = {
  commentId: number;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ commentId }: Mutation) => {
      await apiClient.delete(`post-comment/${commentId}`);
    },
    {
      onError: () => toast.error('Error, try again later.'),
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    },
  );
};
