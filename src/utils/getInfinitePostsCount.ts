import { POSTS_PER_SCROLL } from '@/pages/api/post/infinitePosts';

type InfinitePostsCount = {
  count: number;
  skipNumber: number;
};

export const getInfinitePostsCount = ({ count, skipNumber }: InfinitePostsCount) => {
  const canLoadMore = count > (skipNumber + 1) * POSTS_PER_SCROLL;
  const nextCursor = canLoadMore ? skipNumber + 1 : null;

  return {
    postsCount: count,
    canLoadMore,
    nextCursor,
  };
};
