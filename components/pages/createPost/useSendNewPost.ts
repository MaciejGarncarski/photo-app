import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAuth } from '@/components/organisms/signIn/useAuth';
import { FinalImages } from '@/components/pages/createPost/CreatePost';

type MutationValues = {
  description: string;
  images: FinalImages;
};

type UploadPostArguments = {
  author: string;
  description: string;
  images: FinalImages;
};

type Request = {
  author: string;
  description: string;
  images: Array<Blob | null>;
};

const uplaodPost = async ({ description, images, author }: UploadPostArguments) => {
  const imagesFiles = images.map((img) => {
    if (img?.file) {
      return img.file;
    }
    return null;
  });

  return await axios.putForm<unknown, null, Request>('/api/post', {
    description,
    images: imagesFiles,
    author,
  });
};

export const useSendNewPost = () => {
  const { push } = useRouter();
  const { session } = useAuth();

  return useMutation(
    async ({ description, images }: MutationValues) => {
      if (!session?.user?.id) {
        return;
      }
      return await uplaodPost({ author: session.user.id, description, images });
    },
    {
      onSuccess: () => {
        push('/');
      },
    },
  );
};
