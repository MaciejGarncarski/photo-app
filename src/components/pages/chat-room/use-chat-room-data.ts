import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useAuth } from '@/src/hooks/use-auth';

import { getChatRoomData } from '@/src/services/chat.service';

export const useChatRoomData = () => {
  const params = useParams();
  const { sessionUser } = useAuth();
  const receiverId = params?.receiverId as string;

  return useQuery({
    queryKey: ['chatRoomData', { sessionUser: sessionUser?.id, receiverId }],
    queryFn: async () => {
      const { data } = await getChatRoomData({ receiverId });

      return data.data;
    },
    enabled: Boolean(sessionUser?.id && receiverId),
    refetchOnWindowFocus: false,
  });
};
