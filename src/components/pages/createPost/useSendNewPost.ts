import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '@/src/hooks/useAuth';
import { CreatePostData } from '@/src/utils/apis/createPost';
import { socket } from '@/src/utils/socket';

export type MutationValues = {
  description: string;
  imageUrls: Array<number>;
};

const uplaodPost = async ({ description, imageUrls, authorId }: CreatePostData) => {
  return await axios.post<unknown, null, CreatePostData>('/api/post', {
    description,
    imageUrls,
    authorId,
  });
};

export const useSendNewPost = () => {
  const { session } = useAuth();

  return useMutation(
    async ({ description, imageUrls }: MutationValues) => {
      if (!session?.user?.id) {
        return;
      }

      return await uplaodPost({ authorId: session.user.id, description, imageUrls });
    },
    {
      onSuccess: () => {
        socket.emit('new post');
      },
    },
  );
};
