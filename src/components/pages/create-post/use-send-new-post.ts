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

  images.forEach((img) => {
    if (img) {
      formData.append('images', img);
    }
  });

  return apiClient.post(`post/create-post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
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
