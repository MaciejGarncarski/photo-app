import { apiClient, fetcher } from '@/src/utils/api/api-client';

import { userWithPreferencesSchema } from '@/src/schemas/user.schema';

export const registerUser = fetcher
  .path('/auth/register')
  .method('post')
  .create();

export const signIn = fetcher.path('/auth/sign-in').method('post').create();

export const signOut = fetcher.path('/auth/me').method('delete').create();

export const getSessionUser = fetcher.path('/auth/me').method('get').create();

export const getSessionUserServer = async () => {
  const { cookies: serverCookies } = await import('next/headers');

  const data = await apiClient({
    url: '/auth/me',
    method: 'GET',
    schema: userWithPreferencesSchema,
    headers: {
      Cookie: serverCookies().toString(),
    },
  });
  return data;
};
