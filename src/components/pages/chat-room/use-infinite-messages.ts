import { useInfiniteQuery } from '@tanstack/react-query';

import { ChatMessagesResponse } from '@/src/schemas/chat';
import { getChatMessages } from '@/src/services/chat.service';

type Props = {
  friendId?: string;
};

export const useInfiniteMessages = ({ friendId }: Props) => {
  return useInfiniteQuery({
    queryKey: ['chatMessages', friendId],
    queryFn: ({ pageParam }) => getChatMessages({ pageParam, friendId }),
    defaultPageParam: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: (prevMessages: ChatMessagesResponse) => {
      return prevMessages?.currentPage === prevMessages.totalPages
        ? undefined
        : prevMessages.currentPage + 1;
    },
    enabled: Boolean(friendId),
  });
};
