import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { userQueryOptions } from "@/hooks/use-user";

import { getPostQueryOptions } from "@/components/pages/account/use-post";
import { Home } from "@/components/pages/home/home";
import { getHomepagePostsOptions } from "@/components/pages/home/use-homepage-posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchInfiniteQuery(getHomepagePostsOptions);

  const postData = data.pages.map(({ data }) =>
    data.map(({ authorId, id }) => [authorId, id])
  )[0];

  await Promise.all(
    postData.map(([authorId, postId]) => {
      if (typeof authorId === "string") {
        return queryClient.prefetchQuery(userQueryOptions(authorId));
      }
      if (typeof postId === "number") {
        return queryClient.prefetchQuery(getPostQueryOptions(postId));
      }
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
