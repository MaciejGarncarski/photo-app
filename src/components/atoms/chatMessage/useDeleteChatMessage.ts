import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

type Mutation = {
  id: string;
};

type Arguments = {
  sender: string;
  receiver: string;
};

export const useDeleteChatMessage = ({ sender, receiver }: Arguments) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id }: Mutation) => {
      return apiClient.delete(`chat/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['chat', sender, receiver]);
      },
    },
  );
};
