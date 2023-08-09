import { QueryClient } from '@tanstack/react-query';
import Router from 'next/router';

import { apiClient } from '@/src/utils/api-client';

export const signOut = async (queryClient: QueryClient) => {
  await apiClient.delete('auth/me');
  await Router.push('/');
  await queryClient.invalidateQueries(['session']);
};
