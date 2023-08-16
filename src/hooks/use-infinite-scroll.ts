'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type UseInfiniteScroll = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  enabled: boolean;
};

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  enabled,
}: UseInfiniteScroll) => {
  const { ref, inView } = useInView({ rootMargin: '100px' });

  useEffect(() => {
    if (inView && hasNextPage && enabled) {
      fetchNextPage();
    }
  }, [enabled, fetchNextPage, hasNextPage, inView]);

  return { inView, ref };
};
