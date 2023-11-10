import { QueryClient } from '@tanstack/react-query';

import { getSessionUserServer } from '@/src/services/auth.service';
import { getUser } from '@/src/services/user.service';

export const prefetchSession = async (queryClient: QueryClient) => {
  try {
    const sessionUser = await queryClient.fetchQuery({
      queryKey: ['session'],
      queryFn: getSessionUserServer,
    });

    if (sessionUser.id) {
      await queryClient.prefetchQuery({
        queryKey: ['user', sessionUser.id],
        queryFn: async () => {
          const { data: user } = await getUser({ userId: sessionUser.id });
          return user.data;
        },
      });
    }
  } catch (error) {}
};
