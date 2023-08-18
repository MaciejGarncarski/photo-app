import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/use-auth';
import { apiClient } from '@/src/utils/api-client';
import { socket } from '@/src/utils/socket';

import { CreatePostInput } from '@/src/schemas/post.schema';

export type MutationValues = {
  description: string;
  imageUrls: Array<number>;
};

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
    formData: true,
    url: 'post/create-post',
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
    onSuccess: () => {
      socket.emit('new post');
    },
  });
};
