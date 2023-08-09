import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/src/hooks/use-auth';
import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useIsGoingUp } from '@/src/hooks/use-is-scrolling-up';
import { socket } from '@/src/utils/socket';

import { useInfiniteMessages } from '@/src/components/pages/chat-room/use-infinite-messages';

export const useChatMessages = () => {
  const [inputVal, setInputVal] = useState('');
  const router = useRouter();
  const { sessionUser } = useAuth();
  const { isMobile } = useIsMobile();
  const { isGoingUp } = useIsGoingUp();

  const friendId = router.query.receiverId as string;

  const { isLoading, fetchNextPage, hasNextPage, isError, data } =
    useInfiniteMessages({
      friendId,
    });

  const fetchNext = () => {
    fetchNextPage();
  };

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: Boolean(hasNextPage),
    onLoadMore: fetchNext,
    disabled: !hasNextPage || isError,
    rootMargin: '0px 0px 50% 0px',
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
    infiniteRef,
    isMobile,
    isGoingUp,
    friendId,
    isError,
    inputVal,
  };
};
