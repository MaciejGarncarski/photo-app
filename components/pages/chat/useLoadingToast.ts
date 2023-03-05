import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Socket } from 'socket.io-client';

export const useLoadingToast = (socket: Socket) => {
  useEffect(() => {
    toast.promise(
      new Promise<string>((resolve, reject) => {
        socket.on('connect', () => {
          resolve('Connected');
        });
        socket.on('connect_error', () => {
          reject('Error');
        });
      }),
      { error: "Can't connect to chat", loading: 'Connecting', success: 'Connected' },
    );
  }, [socket]);
};
