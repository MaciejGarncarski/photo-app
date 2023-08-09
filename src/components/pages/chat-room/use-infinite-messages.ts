import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatMessages } from '@/src/services/chat.service';

type Props = {
  friendId?: string;
};

export const useInfiniteMessages = ({ friendId }: Props) => {
  return useInfiniteQuery(
    ['chatMessages', friendId],
    ({ pageParam }) => getChatMessages({ pageParam, friendId }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevMessages) => {
        return prevMessages?.currentPage === prevMessages.totalPages
          ? undefined
          : prevMessages.currentPage + 1;
      },
      enabled: Boolean(friendId),
    },
  );
};
