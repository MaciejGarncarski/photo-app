import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatMessages } from '@/src/services/chat.service';

type PropsTypes = {
  friendId?: string;
};

export const useChatMessages = ({ friendId }: PropsTypes) => {
  return useInfiniteQuery(['chatMessages', friendId], ({ pageParam }) => getChatMessages({ pageParam, friendId }), {
    refetchOnWindowFocus: false,
    getNextPageParam: (prevMessages) => {
      return prevMessages?.currentPage === prevMessages.totalPages ? undefined : prevMessages.currentPage + 1;
    },
    enabled: Boolean(friendId),
  });
};
