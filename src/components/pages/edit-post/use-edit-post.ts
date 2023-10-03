import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { apiClient } from '@/src/utils/api-client';

type Mutation = {
  description: string;
};

export const useEditPost = ({ postId }: { postId: number }) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ description }: Mutation) => {
      return apiClient({
        method: 'POST',
        url: 'post/edit',
        body: {
          postId,
          description,
        },
      });
    },
    onSuccess: () => router.push(`/post/${postId}`),
  });
};
