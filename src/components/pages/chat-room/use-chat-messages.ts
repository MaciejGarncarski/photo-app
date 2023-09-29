import { useParams } from 'next/navigation';

import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';
import { useIsScrollingUp } from '@/src/hooks/use-is-scrolling-up';

import { useInfiniteMessages } from '@/src/components/pages/chat-room/use-infinite-messages';

export const useChatMessages = () => {
  const params = useParams();
  const friendId = params?.receiverId as string;
  const { isScrollingUp } = useIsScrollingUp();

  const { isLoading, fetchNextPage, hasNextPage, isError, data } =
    useInfiniteMessages({
      friendId,
    });

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  return {
    data,
    isLoading,
    hasNextPage,
    ref,
    isScrollingUp,
    friendId,
    isError,
  };
};
