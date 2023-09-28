import { getQueryClient } from '@/src/utils/get-query-client';

import { getSessionUserServer } from '@/src/services/user.service';

export const prefetchSession = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['session'],
    queryFn: getSessionUserServer,
  });
};
