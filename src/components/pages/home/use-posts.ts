import {
  QueryKey,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { getInfinitePosts } from '@/src/services/posts.service';

export const HOME_POSTS_QUERY_KEY: QueryKey = ['homepage infinite posts'];

export const useInfinitePosts = () => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: HOME_POSTS_QUERY_KEY,
    queryFn: getInfinitePosts,
    refetchOnWindowFocus: false,
    getNextPageParam: (prevPosts) => {
      return prevPosts.currentPage === prevPosts.totalPages
        ? undefined
        : prevPosts.currentPage + 1;
    },
    defaultPageParam: 0,
  });

  if (query.data) {
    query.data.pages.forEach((page) => {
      page.posts.forEach((post) =>
        queryClient.prefetchQuery({ queryKey: ['postId', post.id] }),
      );
    });
  }

  return query;
};
