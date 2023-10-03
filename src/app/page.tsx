import { dehydrate } from '@tanstack/react-query';

import { prefetchSession } from '@/src/utils/api/prefetch-session';
import { getQueryClient } from '@/src/utils/get-query-client';
import { Hydrate } from '@/src/utils/hydrate';

import { Home } from '@/src/components/pages/home/home';
import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-posts';
import { getInfinitePosts } from '@/src/services/posts.service';

const HomePage = async () => {
  const queryClient = getQueryClient();
  await prefetchSession();

  await queryClient.prefetchInfiniteQuery({
    queryKey: HOME_POSTS_QUERY_KEY,
    queryFn: getInfinitePosts,
    initialPageParam: 0,
  });

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <Home />
    </Hydrate>
  );
};

export default HomePage;
