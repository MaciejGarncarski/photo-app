import { QueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/api-client';

export const signOut = async (queryClient: QueryClient) => {
  await apiClient.delete('auth/me');
  await queryClient.invalidateQueries(['session']);
};
