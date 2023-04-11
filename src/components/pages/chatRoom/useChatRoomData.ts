import { ChatRoom } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { apiClient } from '@/src/utils/apis/apiClient';

export const useChatRoomData = () => {
  const router = useRouter();
  const chatRoomId = parseInt(router.query.chatRoom as string);

  return useQuery({
    queryKey: ['chatRoomData', chatRoomId],
    queryFn: async () => {
      const { data } = await apiClient.get<ChatRoom>(`/chatRoom/${chatRoomId}`);
      return data;
    },
  });
};
