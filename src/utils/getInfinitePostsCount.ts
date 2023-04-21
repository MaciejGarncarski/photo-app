type InfinitePostsCount = {
  count: number;
  skipNumber: number;
};

export const getInfinitePostsCount = ({ count, skipNumber }: InfinitePostsCount) => {
  const canLoadMore = count > (skipNumber + 1) * 9;
  const nextCursor = canLoadMore ? skipNumber + 1 : null;

  return {
    postsCount: count,
    canLoadMore,
    nextCursor,
  };
};
