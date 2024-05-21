import { Home } from "@/components/pages/home/home";

export default async function HomePage() {
  // const queryClient = new QueryClient();

  // try {
  //   const data = await queryClient.fetchInfiniteQuery(getHomepagePostsOptions);

  //   const postIds = data.pages.map(({ data }) => data.map(({ id }) => id))[0];
  //   const authorIds = data.pages.map(({ data }) =>
  //     data.map(({ authorId }) => authorId)
  //   )[0];

  //   await Promise.all(
  //     postIds.map((id) => {
  //       return queryClient.prefetchQuery(getPostQueryOptions(id));
  //     })
  //   );

  //   await Promise.all(
  //     authorIds.map((authorId) => {
  //       return queryClient.prefetchQuery(userQueryOptions(authorId));
  //     })
  //   );

  // } catch (error) {
  // }

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <Home />
    // </HydrationBoundary>
  );
}
