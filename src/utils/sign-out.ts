import { QueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/api-client';

export const signOut = async (queryClient: QueryClient) => {
  await apiClient({
    url: 'auth/me',
    method: 'DELETE',
  });
  await queryClient.invalidateQueries({ queryKey: ['session'] });
};
