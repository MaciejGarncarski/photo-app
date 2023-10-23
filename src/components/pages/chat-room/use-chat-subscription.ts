import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { useAuth } from '@/src/hooks/use-auth';
import { socket } from '@/src/utils/api/socket';

import { useChatRoomData } from '@/src/components/pages/chat-room/use-chat-room-data';
import { useNotificationSoundPreference } from '@/src/components/settings/use-notification-sound-preference';

const notificationAudio = new Audio('/notification.mp3');

export const useChatSubscription = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: chatRoomData, isError: chatRoomError } = useChatRoomData();
  const { isSoundEnabled } = useNotificationSoundPreference();
  const { sessionUser } = useAuth();

  useEffect(() => {
    if (chatRoomError) {
      router.push('/chat/');
      toast.error('Cannot connect to chat');
    }
  }, [chatRoomError, router]);

  useEffect(() => {
    if (chatRoomData?.id !== 0) {
      socket.emit('join chat room', { chatRoomId: chatRoomData?.id });
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
  }, [chatRoomData?.id, isSoundEnabled, queryClient, sessionUser?.id]);
};
