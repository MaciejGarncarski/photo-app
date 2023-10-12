import { getQueryClient } from '@/src/utils/api/get-query-client';

import { getSessionUserServer } from '@/src/services/auth.service';
import { getUser } from '@/src/services/user.service';

export const prefetchSession = async () => {
  const queryClient = getQueryClient();

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
