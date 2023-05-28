import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

const invalidateChat = (queryClient: QueryClient, userId: string) => {
  queryClient.invalidateQueries(['chatMessages', userId], {
    refetchPage: (lastPage, index) => {
      return index === 0;
    },
  });
};

export const useChatSubscription = (socket: Socket, chatRoomId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (chatRoomId !== 0) {
      socket.emit('join chat room', { chatRoomId });
    }

    socket.on('new message', (data) => {
      const { receiverId, senderId } = data;
      invalidateChat(queryClient, receiverId);
      invalidateChat(queryClient, senderId);
    });

    return () => {
      socket.off('new post');
    };
  }, [chatRoomId, queryClient, socket]);
};
