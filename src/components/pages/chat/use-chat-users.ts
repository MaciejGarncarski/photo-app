'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '@/src/hooks/use-auth';
import { apiClient } from '@/src/utils/api-client';

import { ChatUsersResponse, chatUsersResponseSchema } from '@/src/schemas/chat';

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

  const chatUsers = useInfiniteQuery({
    queryKey: ['chat users', sessionUser?.id, searchedUser],
    queryFn: async ({ pageParam = 0 }) => {
      return await apiClient({
        url: `chat/chatUsers?skip=${pageParam}&searchedUser=${searchedUser}`,
        schema: chatUsersResponseSchema,
      });
    },
    initialPageParam: 0,
    enabled: isEnabled,
    staleTime: 20000,
    refetchOnWindowFocus: false,
    getNextPageParam: (prevMessages: ChatUsersResponse) => {
      return prevMessages?.currentPage === prevMessages.totalPages
        ? undefined
        : prevMessages.currentPage + 1;
    },
  });

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
