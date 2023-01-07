import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

import { useAuth } from '@/components/organisms/signIn/useAuth';

import { PutCollectionSchema } from '@/pages/api/collection';

type CollectionMutation = {
  type?: 'remove';
  postId: number;
};

type PutCollection = z.infer<typeof PutCollectionSchema>;

export const useCollectionMutation = () => {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ type, postId }: CollectionMutation) => {
      if (type === 'remove') {
        await axios.delete(`/api/collection?postID=${postId}`);
        return;
      }
      await axios.put<null, null, PutCollection>('/api/collection', {
        userId: session?.user?.id ?? '',
        postId: postId.toString(),
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['homepage infinite posts']);
        await queryClient.invalidateQueries(['collection']);
      },
    },
  );
};
