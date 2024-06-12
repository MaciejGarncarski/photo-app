import {
  infiniteQueryOptions,
  type QueryKey,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import { nextPageParam } from "@/utils/api/next-page-param";

import { getInfinitePosts } from "@/services/posts.service";

export const HOME_POSTS_QUERY_KEY: QueryKey = ["homepage infinite posts"];

export const getHomepagePostsOptions = infiniteQueryOptions({
  queryKey: HOME_POSTS_QUERY_KEY,
  queryFn: async ({ pageParam }) => {
    const { data } = await getInfinitePosts({
      skip: pageParam.toString(),
    });

    if (!data) {
      throw new Error("Fetch failed");
    }

    return data;
  },
  initialPageParam: 0,
  refetchOnWindowFocus: false,
  getNextPageParam: nextPageParam,
});

export const useHomepagePosts = () => {
  const query = useSuspenseInfiniteQuery(getHomepagePostsOptions);
  return query;
};
