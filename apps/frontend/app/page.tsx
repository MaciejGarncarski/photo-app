import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { userQueryOptions } from "@/hooks/use-user";

import { Home } from "@/components/pages/home/home";
import { getHomepagePostsOptions } from "@/components/pages/home/use-homepage-posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchInfiniteQuery(getHomepagePostsOptions);

  const authorIds = data.pages.map(({ data }) =>
    data.map(({ authorId }) => authorId)
  )[0];

  await Promise.all(
    authorIds.map((authorId) => {
      return queryClient.prefetchQuery(userQueryOptions(authorId));
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
