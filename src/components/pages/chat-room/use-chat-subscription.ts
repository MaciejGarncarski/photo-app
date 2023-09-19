import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { useAuth } from '@/src/hooks/use-auth';

import { useNotificationSoundPreference } from '@/src/components/settings/use-notification-sound-preference';

const invalidateChat = (queryClient: QueryClient, userId: string) => {
  queryClient.invalidateQueries({
    queryKey: ['chatMessages', userId],
  });
};

const notificationAudio = new Audio('/notification.mp3');

export const useChatSubscription = (socket: Socket, chatRoomId: number) => {
  const queryClient = useQueryClient();
  const { isSoundEnabled } = useNotificationSoundPreference();
  const { sessionUser } = useAuth();

  useEffect(() => {
    if (chatRoomId !== 0) {
      socket.emit('join chat room', { chatRoomId });
    }

    socket.on('new message', (data) => {
      const { receiverId, senderId } = data;
      invalidateChat(queryClient, receiverId);

      if (isSoundEnabled && sessionUser?.id !== senderId) {
        notificationAudio.play();
      }

      invalidateChat(queryClient, senderId);
    });

    return () => {
      socket.off('new post');
    };
  }, [chatRoomId, isSoundEnabled, queryClient, sessionUser?.id, socket]);
};
