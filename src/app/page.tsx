import { dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/src/utils/api/get-query-client';
import { Hydrate } from '@/src/utils/api/hydrate';
import { prefetchSession } from '@/src/utils/api/prefetch-session';

import { Home } from '@/src/components/pages/home/home';
import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-homepage-posts';
import { getInfinitePosts } from '@/src/services/posts.service';

const HomePage = async () => {
  const queryClient = getQueryClient();

  await prefetchSession();
  await queryClient.prefetchInfiniteQuery({
    queryKey: HOME_POSTS_QUERY_KEY,
    queryFn: async ({ pageParam }) => {
      const { data } = await getInfinitePosts({
        skip: pageParam.toString(),
      });

      return data;
    },
    initialPageParam: 0,
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Home />
    </Hydrate>
  );
};

export default HomePage;
