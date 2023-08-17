import { useParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuth } from '@/src/hooks/use-auth';
import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';
import { useIsScrollingUp } from '@/src/hooks/use-is-scrolling-up';
import { socket } from '@/src/utils/socket';

import { useInfiniteMessages } from '@/src/components/pages/chat-room/use-infinite-messages';

export const useChatMessages = () => {
  const [inputVal, setInputVal] = useState('');
  const params = useParams();
  const { sessionUser } = useAuth();

  const { isScrollingUp } = useIsScrollingUp();

  const friendId = params?.receiverId as string;

  const { isLoading, fetchNextPage, hasNextPage, isError, data } =
    useInfiniteMessages({
      friendId,
    });

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const message = {
    receiverId: friendId,
    senderId: sessionUser?.id || '',
    message: inputVal,
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setInputVal('');
    socket.emit('send message', message);
  };

  return {
    onChange,
    onSubmit,
    data,
    isLoading,
    hasNextPage,
    ref,
    isScrollingUp,
    friendId,
    isError,
    inputVal,
  };
};
