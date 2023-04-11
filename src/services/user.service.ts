import axios from 'axios';

import { userApiResponseSchema } from '@/src/consts/schemas';

type GetUser = {
  userId: string;
};

export const getUser = async ({ userId }: GetUser) => {
  const { data } = await axios.get(`http://localhost:3001/api/users/${userId}`);
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
  const { data } = await axios.get(`http://localhost:3001/api/users/username/${username}`);
  const response = userApiResponseSchema.safeParse(data);

  if (!response.success) {
    throw new Error(`Invalid data, ${JSON.stringify(response.error)}`);
  }

  return response.data;
};
