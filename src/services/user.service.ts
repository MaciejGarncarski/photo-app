import axios from 'axios';

import { clientEnv } from '@/src/utils/env';

import { userApiResponseSchema } from '@/src/schemas/user.schema';

type GetUser = {
  userId: string;
};

export const getUser = async ({ userId }: GetUser) => {
  const { data } = await axios.get(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/users/${userId}`, { withCredentials: true });
  const response = userApiResponseSchema.safeParse(data);

  if (!response.success) {
    throw new Error(`Invalid data, ${JSON.stringify(response.error)}`);
  }

  return response.data;
};

type GetUserByUsername = {
  username: string;
};

export const getUserByUsername = async ({ username }: GetUserByUsername) => {
  const { data } = await axios.get(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/users/username/${username}`, {
    withCredentials: true,
  });
  const response = userApiResponseSchema.safeParse(data);

  if (!response.success) {
    throw new Error(`Invalid data, ${JSON.stringify(response.error)}`);
  }

  return response.data;
};
