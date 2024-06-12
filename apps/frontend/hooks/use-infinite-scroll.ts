"use client";

import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: rootMargin ?? "0px",
    onChange: (inView) => {
      if (inView && hasNextPage && enabled) {
        fetchNextPage();
      }
    },
  });

  return { inView, ref };
};
