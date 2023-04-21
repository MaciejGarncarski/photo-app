import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

type Mutation = {
  messageId: string;
};

type Arguments = {
  receiverId: string;
};

export const useDeleteChatMessage = ({ receiverId }: Arguments) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ messageId }: Mutation) => {
      return apiClient.delete(`chat/${messageId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['chatMessages', receiverId]);
      },
    },
  );
};
