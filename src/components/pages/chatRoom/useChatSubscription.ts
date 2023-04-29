import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

export const useChatSubscription = (socket: Socket, chatRoomId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (chatRoomId !== 0) {
      socket.emit('join chat room', { chatRoomId });
    }

    socket.on('new message', (data) => {
      const { receiverId } = data;
      queryClient.invalidateQueries(['chatMessages', receiverId], {
        refetchPage: (lastPage, index) => {
          return index === 0;
        },
      });
    });

    return () => {
      socket.off('new post');
    };
  }, [chatRoomId, queryClient, socket]);
};
