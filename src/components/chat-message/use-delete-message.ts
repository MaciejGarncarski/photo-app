import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteChatMessage } from '@/src/services/chat.service';

type Arguments = {
  receiverId: string;
};

export const useDeleteChatMessage = ({ receiverId }: Arguments) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChatMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessages', receiverId] });
    },
  });
};
