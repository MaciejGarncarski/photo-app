import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useAuth } from '@/src/hooks/use-auth';

import { getChatRoomData } from '@/src/services/chat.service';

export type ChatRoom = {
  id: number;
  sender_id: string;
  receiver_id: string;
};

export const useChatRoomData = () => {
  const params = useParams();
  const { sessionUser } = useAuth();
  const receiverId = params?.receiverId as string;

  return useQuery({
    queryKey: ['chatRoomData', { sessionUser: sessionUser?.id, receiverId }],
    queryFn: () => getChatRoomData({ receiverId }),
    enabled: Boolean(sessionUser?.id && receiverId),
    refetchOnWindowFocus: false,
  });
};
