'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type UseInfiniteScroll = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  enabled: boolean;
  rootMargin?: string;
};

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  enabled,
  rootMargin,
}: UseInfiniteScroll) => {
  const { ref, inView } = useInView({ rootMargin: rootMargin ?? '200px' });

  useEffect(() => {
    if (inView && hasNextPage && enabled) {
      fetchNextPage();
    }
  }, [enabled, fetchNextPage, hasNextPage, inView, ref]);

  return { inView, ref };
};
