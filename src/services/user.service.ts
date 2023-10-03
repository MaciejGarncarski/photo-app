import { apiClient } from '@/src/utils/api-client';

import { EditAccountInput } from '@/src/schemas/edit.schema';
import { followersResponseSchema } from '@/src/schemas/follower-stats';
import {
  userApiResponseSchema,
  userWithPreferencesSchema,
} from '@/src/schemas/user.schema';

type GetUser = {
  userId: string;
};

export const getUser = async ({ userId }: GetUser) => {
  const data = await apiClient({
    url: `user/${userId}`,
    method: 'GET',
    schema: userApiResponseSchema,
  });
  return data;
};

type GetUserByUsername = {
  username: string;
};

export const getUserByUsername = async ({ username }: GetUserByUsername) => {
  const data = await apiClient({
    url: `user/username/${username}`,
    method: 'GET',
    schema: userApiResponseSchema,
  });

  return data;
};

export const editAccount = (data: EditAccountInput) => {
  return apiClient({
    url: 'user/edit',
    method: 'POST',
    body: data,
  });
};

type UploadAvatar = {
  avatarFile: Blob;
};

export const uploadAvatar = ({ avatarFile }: UploadAvatar) => {
  const formData = new FormData();
  formData.append('image', avatarFile);

  return apiClient({
    url: `user/avatar`,
    method: 'POST',
    body: formData,
  });
};

export const deleteAvatar = () => {
  return apiClient({
    url: 'user/avatar',
    method: 'DELETE',
  });
};

export const getSessionUser = async () => {
  const data = await apiClient({
    url: 'auth/me',
    method: 'GET',
    schema: userWithPreferencesSchema,
  });
  return data;
};

export const getSessionUserServer = async () => {
  const { cookies: serverCookies } = await import('next/headers');

  const data = await apiClient({
    url: 'auth/me',
    method: 'GET',
    schema: userWithPreferencesSchema,
    headers: {
      Cookie: serverCookies().toString(),
    },
  });
  return data;
};

type FollowOtherUser = {
  userId: string;
  isFollowing: boolean;
};

export const followOtherUser = ({ userId, isFollowing }: FollowOtherUser) => {
  const apiUrl = `user/${userId}/follow`;

  return apiClient({
    url: apiUrl,
    method: isFollowing ? 'DELETE' : 'PUT',
  });
};

type GetFollowers = {
  pageParam: number;
  type: 'followers' | 'friends';
  userId: string;
};

export const getFollowers = async ({
  pageParam = 0,
  type,
  userId,
}: GetFollowers) => {
  return apiClient({
    url: `follower-stats/${type}?userId=${userId}&skip=${pageParam ?? 0}`,
    schema: followersResponseSchema,
    method: 'GET',
  });
};
