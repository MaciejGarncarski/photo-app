import { apiClient } from '@/src/utils/apis/apiClient';

import { postSchema } from '@/src/consts/schemas';

type GetPost = {
  postId: number;
};

export const getPost = async ({ postId }: GetPost) => {
  const { data } = await apiClient.get(`post/${postId}`);
  const response = postSchema.safeParse(data);

  if (!response.success) {
    throw new Error(`Invalid data, ${JSON.stringify(response.error)}`);
  }

  return response.data;
};
