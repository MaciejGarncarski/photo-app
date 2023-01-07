import { Post, User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

type UseCollection = {
  userID: string;
};

export type PostData = Post & {
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean | null;
  isInCollection?: boolean | null;
  author: User;
  _count: {
    posts_likes: number;
    posts_comments: number;
  };
};

export const useCollection = ({ userID }: UseCollection) => {
  return useInfiniteQuery(
    ['collection', userID],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get<InfinitePosts<PostData>>(`/api/collection?skip=${pageParam}&userId=${userID}`);
      return data;
    },

    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevPosts) => {
        return prevPosts.cursor ?? undefined;
      },
    },
  );
};
