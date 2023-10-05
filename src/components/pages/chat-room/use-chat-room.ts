'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';
import { apiClient } from '@/src/utils/api-client';
import { socket } from '@/src/utils/socket';

import { useChatMessages } from '@/src/components/pages/chat-room/use-chat-messages';
import { useChatRoomData } from '@/src/components/pages/chat-room/use-chat-room-data';
import { useChatSubscription } from '@/src/components/pages/chat-room/use-chat-subscription';

type MessageMutation = {
  senderId: string;
  receiverId: string;
  message: string;
};

export const useChatRoom = () => {
  const router = useRouter();
  const { sessionUser } = useAuth();

  const {
    data,
    isLoading,
    ref,
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

  const messageMutation = useMutation({
    mutationFn: (body: MessageMutation) => {
      return apiClient({
        method: 'POST',
        body,
        url: 'chat/message',
      });
    },
    onSuccess: () => {
      form.setValue('message', '');
    },
  });

  const form = useForm({
    mode: 'all',
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = form.handleSubmit(({ message }) =>
    messageMutation.mutate({
      message,
      senderId: sessionUser?.id || '',
      receiverId: friendId,
    }),
  );

  return {
    isLoading,
    isUserLoading,
    data,
    friendId,
    isError: messagesError,
    friendData,
    hasNextPage,
    onSubmit,
    form,
    ref,
  };
};
