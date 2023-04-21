import { ChangeEvent, FormEvent, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/src/hooks/useAuth';
import { useIsGoingUp } from '@/src/hooks/useIsGoingUp';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import { socket } from '@/src/utils/socket';

import { useChatMessages } from '@/src/components/pages/chatRoom/useChatMessages';
import { useChatRoomData } from '@/src/components/pages/chatRoom/useChatRoomData';
import { useChatSubscription } from '@/src/components/pages/chatRoom/useChatSubscription';

export const useChatRoom = () => {
  const [inputVal, setInputVal] = useState('');

  const { sessionUser } = useAuth();
  const { isMobile } = useIsMobile();
  const { isGoingUp } = useIsGoingUp();
  const { data: chatRoomData } = useChatRoomData();

  useChatSubscription(socket, chatRoomData?.id || 0);
  const friendId = chatRoomData?.receiver_id || '';

  const { isLoading, fetchNextPage, hasNextPage, isError, data } = useChatMessages({
    friendId,
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
    receiverId: friendId,
    senderId: sessionUser?.id || '',
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
