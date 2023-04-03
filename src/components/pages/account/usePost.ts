import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';
import { PostData } from '@/src/utils/apis/transformPost';

export const usePost = ({ postId }: { postId: number }) => {
  return useQuery(
    ['post', postId],
    async () => {
      const { data } = await apiClient.get<PostData>(`post/${postId}`);
      return data;
    },
    { enabled: Boolean(postId) },
  );
};
