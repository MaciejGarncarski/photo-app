import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

type Mutation = {
  description: string;
};

export const useEditPost = ({ postId }: { postId: number }) => {
  const router = useRouter();

  return useMutation(
    async ({ description }: Mutation) => {
      return axios.post('/api/post/edit', {
        postId,
        description,
      });
    },
    { onSuccess: () => router.push(`/post/${postId}`) },
  );
};
