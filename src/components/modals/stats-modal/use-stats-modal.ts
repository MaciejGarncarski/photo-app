import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { useFollowers } from '@/src/components/modals/stats-modal/use-followers';
import { useFriends } from '@/src/components/modals/stats-modal/use-friends';

type Arguments = {
  userId: string;
  type: 'friends' | 'followers';
};

export const useStatsModal = ({ userId, type }: Arguments) => {
  const followers = useFollowers({
    userId,
  });

  const friends = useFriends({
    userId,
  });

  const currentData = type === 'friends' ? friends : followers;

  const isEmpty = currentData.data?.pages[0].users.length === 0;

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(currentData.hasNextPage),
    fetchNextPage: currentData.fetchNextPage,
    enabled: true,
  });

  return {
    isEmpty,
    ref,
    isLoading: currentData.isLoading,
    data: currentData.data,
    hasNextPage: currentData.hasNextPage,
  };
};
