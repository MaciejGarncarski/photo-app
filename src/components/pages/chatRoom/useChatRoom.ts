import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useUser } from '@/src/hooks/useUser';
import { socket } from '@/src/utils/socket';

import { useChatMessages } from '@/src/components/pages/chatRoom/useChatMessages';
import { useChatRoomData } from '@/src/components/pages/chatRoom/useChatRoomData';
import { useChatSubscription } from '@/src/components/pages/chatRoom/useChatSubscription';

export const useChatRoom = () => {
  const router = useRouter();
  const {
    data,
    isLoading,
    infiniteRef,
    inputVal,
    onChange,
    onSubmit,
    hasNextPage,
    friendId,
    isError: messagesError,
  } = useChatMessages();

  const { data: friendData, isLoading: isUserLoading, isError: userError } = useUser({ userId: friendId || '' });
  const { data: chatRoomData, isError: chatRoomError } = useChatRoomData();

  useChatSubscription(socket, chatRoomData?.id || 0);

  useEffect(() => {
    if (messagesError || chatRoomError || userError) {
      router.push('/chat/');
      toast.error('Cannot connect to chat');
    }
  }, [chatRoomError, messagesError, router, userError]);

  return {
    isLoading,
    isUserLoading,
    data,
    friendId,
    isError: messagesError,
    friendData,
    inputVal,
    hasNextPage,
    onSubmit,
    onChange,
    infiniteRef,
  };
};
