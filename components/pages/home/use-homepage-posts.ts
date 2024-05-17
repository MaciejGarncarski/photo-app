import {
  infiniteQueryOptions,
  type QueryKey,
  useInfiniteQuery,
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

export const TEST = infiniteQueryOptions({
  queryKey: HOME_POSTS_QUERY_KEY,
  queryFn: async ({ pageParam }) => {
    const sleep: Promise<string> = new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 5000);
    });

    await sleep;

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
  const query = useInfiniteQuery(TEST);
  return query;
};
