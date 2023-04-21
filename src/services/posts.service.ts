import axios from 'axios';

import { clientEnv } from '@/src/utils/env';

import { Post } from '@/src/schemas/post.schema';

type GetPost = {
  postId: number;
};

export const getPost = async ({ postId }: GetPost) => {
  const { data } = await axios.get<Post>(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/post/${postId}`, {
    withCredentials: true,
  });

  return data;
};
