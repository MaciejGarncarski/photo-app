import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPost } from '@/services/posts.service';

export const getPostQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data: post } = await getPost({ postId: postId.toString() });

      if (!post.data) {
        throw new Error('No post data.');
      }

      return post.data;
    },
    enabled: Boolean(postId),
  });

export const usePost = ({ postId }: { postId: number }) => {
  return useQuery(getPostQueryOptions(postId));
};
