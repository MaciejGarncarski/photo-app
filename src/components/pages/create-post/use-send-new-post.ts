import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/use-auth';
import { apiClient } from '@/src/utils/api/api-client';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-homepage-posts';
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
  const queryClient = useQueryClient();
  const { sessionUser } = useAuth();

  return useMutation({
    mutationFn: async ({ description, images }: CreatePostInput) => {
      if (!sessionUser?.id) {
        throw new Error();
      }

      return uplaodPost({ description, images });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY });
    },
  });
};
