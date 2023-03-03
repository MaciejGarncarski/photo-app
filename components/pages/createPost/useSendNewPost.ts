import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';
import { CreatePostData } from '@/utils/createPost';

type MutationValues = {
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
  const { push } = useRouter();
  const { session } = useAuth();

  return useMutation(
    async ({ description, imageUrls }: MutationValues) => {
      if (!session?.user?.id) {
        return;
      }

      return await uplaodPost({ authorId: session.user.id, description, imageUrls });
    },
    {
      onError: () => toast.error('Error, try again later.'),
      onSuccess: () => {
        push('/');
      },
    },
  );
};
