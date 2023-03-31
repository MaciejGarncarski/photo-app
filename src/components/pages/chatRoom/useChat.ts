import { ChangeEvent, FormEvent, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { socket } from '@/utils/socket';

import { useChatMessages } from '@/components/pages/chatRoom/useChatMessages';
import { useChatSubscription } from '@/components/pages/chatRoom/useChatSubscription';

type PropsTypes = {
  chatRoomId: number;
  friendId: string;
};

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
