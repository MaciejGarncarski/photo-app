import { useInfiniteQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { apiClient } from '@/src/utils/apis/apiClient';

import { UserApiResponse } from '@/src/pages/api/account/userId/[userId]';

export type ChatUsersResponse = {
  users: Array<{
    user: UserApiResponse;
    chatRoomId: number;
  }>;
  usersCount: number;
  totalPages: number;
  currentPage: number;
};

export const useChatUsers = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchedUser, setSearchedUser] = useState('');
  const [isEnabled, setIsEnabled] = useState(inputValue === '' || false);
  const { session } = useAuth();

  const resetState = () => {
    setSearchedUser('');
    setInputValue('');
  };

  const onSubmit = (submitEv: FormEvent<HTMLFormElement>) => {
    submitEv.preventDefault();
    setSearchedUser(inputValue);
    setIsEnabled(true);
  };

  const onChange = (changeEv: ChangeEvent<HTMLInputElement>) => {
    setInputValue(changeEv.target.value);
  };

  const chatUsers = useInfiniteQuery(
    ['chat users', session?.user?.id, searchedUser],
    async ({ pageParam = 0 }) => {
      const { data: responseData } = await apiClient.get<ChatUsersResponse>(
        `chat/getChatUsers?userId=${session?.user?.id}&currentPage=${pageParam}&searchedUser=${searchedUser}`,
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
    inputValue,
    setInputValue,
    isEnabled,
    setIsEnabled,
    setSearchedUser,
    resetState,
    onChange,
    onSubmit,
  };
};
