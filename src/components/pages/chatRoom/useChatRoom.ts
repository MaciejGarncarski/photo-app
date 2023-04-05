import { ChangeEvent, FormEvent, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/src/hooks/useAuth';
import { useIsGoingUp } from '@/src/hooks/useIsGoingUp';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import { socket } from '@/src/utils/socket';

import { useChatMessages } from '@/src/components/pages/chatRoom/useChatMessages';
import { useChatSubscription } from '@/src/components/pages/chatRoom/useChatSubscription';

type PropsTypes = {
  chatRoomId: number;
  friendId: string;
};

export const useChatRoom = ({ chatRoomId, friendId }: PropsTypes) => {
  const [inputVal, setInputVal] = useState('');

  const { session } = useAuth();
  const { isMobile } = useIsMobile();
  const { isGoingUp } = useIsGoingUp();

  useChatSubscription(socket, chatRoomId);

  const { isLoading, fetchNextPage, hasNextPage, isError, data } = useChatMessages({
    friendId,
    userId: session?.user?.id ?? '',
  });

  const fetchNext = () => {
    window.scrollBy({ top: 300 });
    fetchNextPage();
  };

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: Boolean(hasNextPage),
    onLoadMore: fetchNext,
    disabled: !hasNextPage || isError,
    rootMargin: '0px 0px 50% 0px',
  });

  const message = {
    receiver: friendId,
    sender: session?.user?.id,
    message: inputVal,
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    socket.emit('send message', message);
    setInputVal('');
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
    inputVal,
  };
};
