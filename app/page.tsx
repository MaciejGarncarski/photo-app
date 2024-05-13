import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getPostQueryOptions } from '@/components/pages/account/use-post';
import { Home } from '@/components/pages/home/home';
import { getHomepagePostsOptions } from '@/components/pages/home/use-homepage-posts';

export default async function HomePage() {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchInfiniteQuery(getHomepagePostsOptions);

  const postIds = data.pages.map(({ data }) => data.map(({ id }) => id))[0];

  await Promise.all(
    postIds.map((id) => {
      return queryClient.prefetchQuery(getPostQueryOptions(id));
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
