import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { apiClient } from '@/src/utils/apis/apiClient';

type Mutation = {
  description: string;
};

export const useEditPost = ({ postId }: { postId: number }) => {
  const router = useRouter();

  return useMutation(
    async ({ description }: Mutation) => {
      return apiClient.post('post/edit', {
        postId,
        description,
      });
    },
    { onSuccess: () => router.push(`/post/${postId}`) },
  );
};
