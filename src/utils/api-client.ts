import axios from 'axios';

import { clientEnv, serverEnv } from '@/src/utils/env';

export const apiClient = axios.create({
  baseURL: `${clientEnv.NEXT_PUBLIC_API_ROOT}/api/`,
  withCredentials: true,
});

export const ssrApiClient = async (url: string) => {
  const response = await fetch(serverEnv.API_URL + '/api/' + url);

  const data = await response.json();
  return data;
};
