'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import { useUser } from '@/src/hooks/use-user';
import { socket } from '@/src/utils/socket';

import { useChatMessages } from '@/src/components/pages/chat-room/use-chat-messages';
import { useChatRoomData } from '@/src/components/pages/chat-room/use-chat-room-data';
import { useChatSubscription } from '@/src/components/pages/chat-room/use-chat-subscription';

export const useChatRoom = () => {
  const router = useRouter();
  const {
    data,
    isLoading,
    ref,
    inputVal,
    onChange,
    onSubmit,
    hasNextPage,
    friendId,
    isError: messagesError,
  } = useChatMessages();

  const {
    data: friendData,
    isLoading: isUserLoading,
    isError: userError,
  } = useUser({ userId: friendId || '' });
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
    ref,
  };
};
