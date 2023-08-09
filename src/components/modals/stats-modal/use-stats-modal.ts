import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useFollowers } from '@/src/components/modals/stats-modal/use-followers';

type Arguments = {
  userId: string;
  type: 'friends' | 'followers';
};

export const useStatsModal = ({ userId, type }: Arguments) => {
  const { data, hasNextPage, isLoading, fetchNextPage } = useFollowers({
    userId,
    type,
  });
  const isEmpty = data?.pages[0].users.length === 0;

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: Boolean(hasNextPage),
    onLoadMore: fetchNextPage,
    disabled: true,
    rootMargin: '0px 0px 400px 0px',
  });

  return { isEmpty, sentryRef, isLoading, data, hasNextPage };
};
