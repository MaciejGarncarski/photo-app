import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PostData } from '@/components/pages/collection/useCollection';

export const usePost = ({ postId }: { postId: number }) => {
  return useQuery(
    ['post', postId],
    async () => {
      const { data } = await axios.get<PostData>(`/api/post/${postId}`);
      return data;
    },
    { enabled: Boolean(postId) },
  );
};
