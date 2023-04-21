import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { ChatMessagesResponse } from '@/src/schemas/chat';

type PropsTypes = {
  friendId: string;
};

export const useChatMessages = ({ friendId }: PropsTypes) => {
  return useInfiniteQuery(
    ['chatMessages', friendId],
    async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<ChatMessagesResponse>(`chat/${friendId}/chatMessages?skip=${pageParam}`);
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
