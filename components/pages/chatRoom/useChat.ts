import { ChangeEvent, FormEvent, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { io } from 'socket.io-client';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { clientEnv } from '@/utils/env.mjs';

import { useChatMessages } from '@/components/pages/chatRoom/useChatMessages';
import { useChatSubscription } from '@/components/pages/chatRoom/useChatSubscription';

type PropsTypes = {
  chatRoomId: number;
  friendId: string;
};

const socket = io(clientEnv.NEXT_PUBLIC_WS_URL, { transports: ['websocket'] });

export const useChat = ({ chatRoomId, friendId }: PropsTypes) => {
  const [inputVal, setInputVal] = useState<string>('');

  const { session } = useAuth();
  const { isMobile } = useScreenWidth();
  const { isGoingUp } = useScrollPosition();

  useChatSubscription(socket, chatRoomId);

  const { isLoading, fetchNextPage, hasNextPage, isError, data } = useChatMessages({
    friendId,
    userId: session?.user?.id ?? '',
  });

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: !hasNextPage || isError,
    rootMargin: '500px 0px 200px 0px',
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
