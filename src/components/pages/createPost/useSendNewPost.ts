import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '@/src/hooks/useAuth';
import { clientEnv } from '@/src/utils/env';
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

  return axios.post(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/post/create-post`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useSendNewPost = () => {
  const { sessionUser } = useAuth();

  return useMutation(
    async ({ description, images }: CreatePostInput) => {
      if (!sessionUser?.id) {
        return;
      }

      return uplaodPost({ description, images });
    },
    {
      onSuccess: () => {
        socket.emit('new post');
      },
    },
  );
};
