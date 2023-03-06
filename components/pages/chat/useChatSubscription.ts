import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

export const useChatSubscription = (socket: Socket, chatRoomId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.emit('join chat room', { chatRoomId });

    socket.on('new message', (data) => {
      const { receiver, sender } = data;
      queryClient.invalidateQueries(['chat', sender, receiver], {
        refetchPage: (lastPage, index) => {
          return index === 0;
        },
      });

      queryClient.invalidateQueries(['chat', receiver, sender], {
        refetchPage: (lastPage, index) => {
          return index === 0;
        },
      });
    });
  }, [chatRoomId, queryClient, socket]);
};