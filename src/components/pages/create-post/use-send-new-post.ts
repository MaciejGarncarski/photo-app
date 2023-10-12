import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/use-auth';
import { apiClient } from '@/src/utils/api/api-client';

import { CreatePostInput } from '@/src/schemas/post.schema';

const uplaodPost = ({ description, images }: CreatePostInput) => {
  const formData = new FormData();

  formData.append('description', description);

  for (const image of images) {
    if (image) {
      formData.append('images', image);
    }
  }

  return apiClient({
    method: 'POST',
    body: formData,
    url: '/posts',
  });
};

export const useSendNewPost = () => {
  const { sessionUser } = useAuth();

  return useMutation({
    mutationFn: async ({ description, images }: CreatePostInput) => {
      if (!sessionUser?.id) {
        return;
      }

      return uplaodPost({ description, images });
    },
  });
};
