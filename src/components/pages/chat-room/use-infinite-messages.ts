import { useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getChatMessages } from '@/src/services/chat.service';

type Props = {
  friendId?: string;
};

export const useInfiniteMessages = ({ friendId }: Props) => {
  return useInfiniteQuery({
    queryKey: ['chatMessages', friendId],
    queryFn: ({ pageParam }) => getChatMessages({ pageParam, friendId }),
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    enabled: Boolean(friendId),
    getNextPageParam: nextPageParam,
  });
};
