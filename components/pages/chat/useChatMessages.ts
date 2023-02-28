import { Message } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

type PropsTypes = {
  userId: string;
  friendId: string;
};

export type InfiniteMessages = {
  messages: Array<Message>;
  messagesCount: number;
  lastPage: number;
  currentPage: number;
};

export const useChatMessages = ({ userId, friendId }: PropsTypes) => {
  return useInfiniteQuery(
    ['chat', userId, friendId],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get<InfiniteMessages>(
        `/api/chat/?userId=${userId}&friendId=${friendId}&page=${pageParam}`,
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevMessages) => {
        return prevMessages?.currentPage === prevMessages.lastPage ? undefined : prevMessages.currentPage + 1;
      },
    },
  );
};
