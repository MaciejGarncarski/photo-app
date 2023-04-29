import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

import { getInfinitePosts } from '@/src/services/posts.service';

export const HOME_POSTS_QUERY_KEY: QueryKey = ['homepage infinite posts'];
const TIMEOUT = 3000;
const COLDSTART_MESSAGE = 'Cold start may take up to 20 seconds. Please be patient.';

export const useInfinitePosts = () => {
  const toastRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const query = useInfiniteQuery(HOME_POSTS_QUERY_KEY, getInfinitePosts, {
    refetchOnWindowFocus: false,
    getNextPageParam: (prevPosts) => {
      return prevPosts.currentPage === prevPosts.totalPages ? undefined : prevPosts.currentPage + 1;
    },
    onSettled: () => {
      if (!toastRef.current || !timeoutRef.current) {
        return;
      }

      clearTimeout(timeoutRef.current);
      toast.remove(toastRef.current);
    },
  });

  useEffect(() => {
    if (query.isLoading) {
      timeoutRef.current = setTimeout(() => {
        toastRef.current = toast.loading(COLDSTART_MESSAGE);
      }, TIMEOUT);
    }
  }, [query.isLoading]);

  return query;
};
