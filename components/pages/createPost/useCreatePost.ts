import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAuth } from '@/components/organisms/signIn/useAuth';

type MutationValues = {
  description: string;
  image: Blob;
};

type UploadPostArguments = {
  author: string;
} & MutationValues;

const uplaodPost = async ({ description, image, author }: UploadPostArguments) => {
  return await axios.putForm<unknown, null, UploadPostArguments>('/api/post', {
    description,
    image,
    author,
  });
};

export const useCreatePost = () => {
  const { push } = useRouter();
  const { session } = useAuth();

  return useMutation(
    async ({ description, image }: MutationValues) => {
      if (!session?.user?.id) {
        return;
      }
      return await uplaodPost({ author: session.user.id, description, image });
    },
    {
      onSuccess: () => {
        push('/');
      },
    },
  );
};
