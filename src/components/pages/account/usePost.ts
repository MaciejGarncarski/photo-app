import { useQuery } from '@tanstack/react-query';

import { getPost } from '@/src/services/posts.service';

export const usePost = ({ postId }: { postId: number }) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost({ postId }),
    enabled: Boolean(postId),
  });
};
