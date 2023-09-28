import { getQueryClient } from '@/src/utils/get-query-client';

import { getSessionUserServer, getUser } from '@/src/services/user.service';

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
        queryFn: () => getUser({ userId: sessionUser.id }),
      });
    }
  } catch (error) {}
};
