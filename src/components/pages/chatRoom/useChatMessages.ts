import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { Message } from '@/src/components/atoms/chatMessage/ChatMessage';

type PropsTypes = {
  userId: string;
  friendId: string;
};

export type InfiniteMessages = {
  messages: Array<Message>;
  messagesCount: number;
  totalPages: number;
  currentPage: number;
};

export const useChatMessages = ({ userId, friendId }: PropsTypes) => {
  return useInfiniteQuery(
    ['chat', userId, friendId],
    async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<InfiniteMessages>(
        `chat/chat?userId=${userId}&friendId=${friendId}&page=${pageParam}`,
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevMessages) => {
        return prevMessages?.currentPage === prevMessages.totalPages ? undefined : prevMessages.currentPage + 1;
      },
    },
  );
};
