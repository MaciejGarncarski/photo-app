import { ChangeEvent, FormEvent, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { io } from 'socket.io-client';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { clientEnv } from '@/utils/env.mjs';

import { useChatMessages } from '@/components/pages/chat/useChatMessages';
import { useChatSubscription } from '@/components/pages/chat/useChatSubscription';

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

  const chatMessages = useChatMessages({ friendId, userId: session?.user?.id ?? '' });

  const [infiniteRef] = useInfiniteScroll({
    loading: chatMessages.isLoading,
    hasNextPage: chatMessages.hasNextPage || false,
    onLoadMore: chatMessages.fetchNextPage,
    disabled: !chatMessages.hasNextPage,
    delayInMs: 100,
    rootMargin: '50px 0px 0px 0px',
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
    chatMessages,
    infiniteRef,
    isMobile,
    isGoingUp,
    friendId,
    inputVal,
  };
};
