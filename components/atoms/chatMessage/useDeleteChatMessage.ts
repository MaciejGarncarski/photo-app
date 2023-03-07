import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

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
      return axios.delete(`/api/chat/${id}`);
    },
    {
      onSettled: () => {
        close();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['chat', sender, receiver]);
      },
    },
  );
};
