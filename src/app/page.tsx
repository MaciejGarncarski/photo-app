import { dehydrate } from '@tanstack/react-query';

import { prefetchSession } from '@/src/utils/api/prefetch-session';
import { getQueryClient } from '@/src/utils/get-query-client';
import Hydrate from '@/src/utils/hydrate';

import { Home } from '@/src/components/pages/home/home';
import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-posts';
import { getInfinitePosts, getPost } from '@/src/services/posts.service';

const HomePage = async () => {
  const queryClient = getQueryClient();
  await prefetchSession();

  const posts = await queryClient.fetchInfiniteQuery({
    queryKey: HOME_POSTS_QUERY_KEY,
    queryFn: getInfinitePosts,
    pages: 3,
    getNextPageParam: (prevPosts) => {
      if (!prevPosts) {
        return undefined;
      }

      return prevPosts.currentPage === prevPosts.totalPages
        ? undefined
        : prevPosts.currentPage + 1;
    },
    initialPageParam: 0,
  });

  await Promise.all(
    posts.pages.map(async ({ posts }) => {
      await Promise.all(
        posts.map(async (post) => {
          await queryClient.prefetchQuery({
            queryKey: ['post', post.id],
            queryFn: () => getPost({ postId: post.id }),
          });
        }),
      );
    }),
  );

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Home />
    </Hydrate>
  );
};

export default HomePage;
