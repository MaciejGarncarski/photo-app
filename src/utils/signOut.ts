import { QueryClient } from '@tanstack/react-query';
import Router from 'next/router';

import { apiClient } from '@/src/utils/apis/apiClient';

export const signOut = async (queryClient: QueryClient) => {
  const { data } = await apiClient.delete('auth/me');
  await queryClient.invalidateQueries(['session']);

  if (data.redirect) {
    Router.push(data.redirect);
  }
};
