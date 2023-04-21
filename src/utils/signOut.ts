import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

import { clientEnv } from '@/src/utils/env';

export const signOut = async (queryClient: QueryClient) => {
  queryClient.invalidateQueries(['session']);
  const { data } = await axios.delete(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/auth/me`, { withCredentials: true });

  if (data.redirect) {
    Router.push(data.redirect);
  }
};
