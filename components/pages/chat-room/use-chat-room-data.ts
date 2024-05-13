import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useAuth } from '@/hooks/use-auth';

import { getChatRoomData } from '@/services/chat.service';

export const useChatRoomData = () => {
  const params = useParams();
  const { sessionUser } = useAuth();
  const username = params?.username as string;

  return useQuery({
    queryKey: ['chatRoomData', { sessionUser: sessionUser?.id, username }],
    queryFn: async () => {
      const { data } = await getChatRoomData({ username });

      return data.data;
    },
    enabled: Boolean(sessionUser?.id && username),
    refetchOnWindowFocus: false,
  });
};
