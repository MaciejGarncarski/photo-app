import { User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';

export type ChatUsersResponse = {
  users: Array<{
    user: User;
    chatRoomId: number;
  }>;
  usersCount: number;
  totalPages: number;
  currentPage: number;
};

type Arguments = {
  searchedUser: string;
};

export const useChatUsers = ({ searchedUser }: Arguments) => {
  const { session } = useAuth();

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['chat users', session?.user?.id, searchedUser],
    async ({ pageParam = 0 }) => {
      const { data: responseData } = await axios.get<ChatUsersResponse>(
        `/api/chat/getChatUsers?userId=${session?.user?.id}&currentPage=${pageParam}&searchedUser=${searchedUser}`,
      );

      return responseData;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevMessages) => {
        return prevMessages?.currentPage === prevMessages.totalPages ? undefined : prevMessages.currentPage + 1;
      },
    },
  );

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: !hasNextPage,
    rootMargin: '0px 0px 500px 0px',
  });

  return { infiniteRef, data, isLoading, hasNextPage, fetchNextPage };
};
