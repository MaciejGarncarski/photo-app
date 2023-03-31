import { User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

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

export const useChatUsers = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [searchedUser, setSearchedUser] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(inputVal === '' || false);
  const { session } = useAuth();

  const chatUsers = useInfiniteQuery(
    ['chat users', session?.user?.id, searchedUser],
    async ({ pageParam = 0 }) => {
      const { data: responseData } = await axios.get<ChatUsersResponse>(
        `/api/chat/getChatUsers?userId=${session?.user?.id}&currentPage=${pageParam}&searchedUser=${searchedUser}`,
      );

      return responseData;
    },
    {
      enabled: isEnabled,
      refetchOnWindowFocus: false,
      getNextPageParam: (prevMessages) => {
        return prevMessages?.currentPage === prevMessages.totalPages ? undefined : prevMessages.currentPage + 1;
      },
      onSettled: () => {
        setIsEnabled(false);
      },
    },
  );

  return {
    chatUsers,
    inputVal,
    setInputVal,
    isEnabled,
    setIsEnabled,
    setSearchedUser,
  };
};
