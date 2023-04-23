import { useInfiniteQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { apiClient } from '@/src/utils/apis/apiClient';

import { ChatUsersResponse } from '@/src/schemas/chat';

export const useChatUsers = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchedUser, setSearchedUser] = useState('');
  const [isEnabled, setIsEnabled] = useState(inputValue === '' || false);
  const { sessionUser } = useAuth();

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
    ['chat users', sessionUser?.id, searchedUser],
    async ({ pageParam = 0 }) => {
      const { data: responseData } = await apiClient.get<ChatUsersResponse>(`chat/chatUsers?skip=${pageParam}`);
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