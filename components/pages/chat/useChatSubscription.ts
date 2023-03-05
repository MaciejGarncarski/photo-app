import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

export const useChatSubscription = (socket: Socket) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('new message', (data) => {
      const { receiver, sender } = data;
      queryClient.invalidateQueries(['chat', receiver, sender]);
      queryClient.invalidateQueries(['chat', sender, receiver]);
    });
  }, [queryClient, socket]);
};
