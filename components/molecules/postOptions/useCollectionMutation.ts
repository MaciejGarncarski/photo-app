import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '@/components/organisms/signIn/useAuth';

type CollectionMutation = {
  type?: 'remove';
  postID: number;
};

export const useCollectionMutation = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ type, postID }: CollectionMutation) => {
      if (type === 'remove') {
        await axios.delete(`/api/collection?postID=${postID}`);
        return;
      }
      await axios.put('/api/collection', {
        userID: session?.user?.id,
        postID,
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['homepage infinite posts']);
      },
    }
  );
};
