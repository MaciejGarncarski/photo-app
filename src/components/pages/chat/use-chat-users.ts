'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '@/src/hooks/use-auth';
import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getChatUsers } from '@/src/services/chat.service';

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
      const { data } = await getChatUsers({
        skip: pageParam.toString(),
        searchedUser,
      });

      if (!data.data) {
        throw new Error('No data');
      }

      return data.data;
    },
    initialPageParam: 0,
    enabled: isEnabled,
    staleTime: 20000,
    refetchOnWindowFocus: false,
    getNextPageParam: nextPageParam,
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
