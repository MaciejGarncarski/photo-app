import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { useAuth } from '@/src/hooks/use-auth';

import { useNotificationSoundPreference } from '@/src/components/settings/use-notification-sound-preference';

const notificationAudio = new Audio('/notification.mp3');

export const useChatSubscription = (socket: Socket, chatRoomId: number) => {
  const queryClient = useQueryClient();
  const { isSoundEnabled } = useNotificationSoundPreference();
  const { sessionUser } = useAuth();

  useEffect(() => {
    if (chatRoomId !== 0) {
      socket.emit('join chat room', { chatRoomId });
    }

    const newMessage = (message: {
      senderId: string;
      receiverId: string;
      text: string;
      createdAt: string;
      id: string;
    }) => {
      const userId =
        sessionUser?.id === message.receiverId
          ? message.senderId
          : message.receiverId;
      queryClient.invalidateQueries({ queryKey: ['chatMessages', userId] });

      if (isSoundEnabled && sessionUser?.id !== message.senderId) {
        notificationAudio.play();
      }
    };

    socket.on('new message', newMessage);

    return () => {
      socket.off('new message', newMessage);
    };
  }, [chatRoomId, isSoundEnabled, queryClient, sessionUser?.id, socket]);
};
