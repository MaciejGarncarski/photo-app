'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';
import { socket } from '@/src/utils/api/socket';

import { useChatMessages } from '@/src/components/pages/chat-room/use-chat-messages';
import { useChatRoomData } from '@/src/components/pages/chat-room/use-chat-room-data';
import { useChatSubscription } from '@/src/components/pages/chat-room/use-chat-subscription';
import { addChatMessage } from '@/src/services/chat.service';

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
    isPending,
    ref,
    hasNextPage,
    friendId,
    isError: messagesError,
  } = useChatMessages();

  const {
    data: friendData,
    isPending: isUserLoading,
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
      return addChatMessage(body);
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
    isPending,
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
