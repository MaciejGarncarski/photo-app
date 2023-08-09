import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

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

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  return { isEmpty, ref, isLoading, data, hasNextPage };
};
