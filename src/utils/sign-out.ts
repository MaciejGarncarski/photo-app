import { QueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/api-client';

export const signOut = async (
  queryClient: QueryClient,
  redirect: () => void,
) => {
  await apiClient({
    url: 'auth/me',
    method: 'DELETE',
  });

  queryClient.setQueryData(['session'], () => null);
  redirect();
};
