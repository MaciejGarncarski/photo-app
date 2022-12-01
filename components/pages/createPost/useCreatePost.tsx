import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type MutationValues = {
  description: string;
  location: string;
  image: Blob;
};

type UploadPostArguments = {
  author: string;
} & MutationValues;

const uplaodPost = async ({ description, location, image, author }: UploadPostArguments) => {
  return await axios.putForm<null, null, UploadPostArguments>('/api/post', {
    description,
    location,
    image,
    author,
  });
};

export const useCreatePost = () => {
  const { data: session } = useSession();
  return useMutation(async ({ description, location, image }: MutationValues) => {
    if (!session?.user?.id) {
      return;
    }
    return await uplaodPost({ author: session.user.id, description, image, location });
  });
};
