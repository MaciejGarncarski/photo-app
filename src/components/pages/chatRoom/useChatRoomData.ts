import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { useAuth } from '@/src/hooks/useAuth';

import { getChatRoomData } from '@/src/services/chat.service';

export type ChatRoom = {
  id: number;
  sender_id: string;
  receiver_id: string;
};

export const useChatRoomData = () => {
  const router = useRouter();
  const { sessionUser } = useAuth();
  const receiverId = router.query.receiverId as string;

  return useQuery({
    queryKey: ['chatRoomData', { sessionUser: sessionUser?.id, receiverId }],
    queryFn: () => getChatRoomData({ receiverId }),
    enabled: Boolean(sessionUser?.id && receiverId),
  });
};
