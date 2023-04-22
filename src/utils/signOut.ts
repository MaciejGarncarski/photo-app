import { QueryClient } from '@tanstack/react-query';
import Router from 'next/router';

import { apiClient } from '@/src/utils/apis/apiClient';

export const signOut = async (queryClient: QueryClient) => {
  queryClient.invalidateQueries(['session']);
  const { data } = await apiClient.delete('auth/me');

  if (data.redirect) {
    Router.push(data.redirect);
  }
};
