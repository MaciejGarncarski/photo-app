import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/useAuth';
import { apiClient } from '@/src/utils/apis/apiClient';
import { CreatePostData } from '@/src/utils/apis/createPost';
import { socket } from '@/src/utils/socket';

export type MutationValues = {
  description: string;
  imageUrls: Array<number>;
};

const uplaodPost = ({ description, imageUrls, authorId }: CreatePostData) => {
  return apiClient.post<unknown, null, CreatePostData>('post', {
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

      return uplaodPost({ authorId: session.user.id, description, imageUrls });
    },
    {
      onSuccess: () => {
        socket.emit('new post');
      },
    },
  );
};
