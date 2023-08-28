import { apiClient } from '@/src/utils/api-client';

import { EditAccountInput } from '@/src/schemas/edit.schema';
import { followersResponseSchema } from '@/src/schemas/follower-stats';
import { userApiResponseSchema } from '@/src/schemas/user.schema';

type GetUser = {
  userId: string;
};

export const getUser = async ({ userId }: GetUser) => {
  const data = await apiClient({
    url: `users/${userId}`,
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
    url: `users/username/${username}`,
    method: 'GET',
    schema: userApiResponseSchema,
  });

  return data;
};

export const editAccount = (data: EditAccountInput) => {
  return apiClient({
    url: 'session-user/edit-account',
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
    url: `session-user/update-avatar`,
    method: 'POST',
    body: formData,
  });
};

export const deleteAvatar = () => {
  return apiClient({
    url: 'session-user/delete-avatar',
    method: 'DELETE',
  });
};

export const getSessionUser = async () => {
  const data = await apiClient({
    url: 'auth/me',
    method: 'GET',
  });
  return data;
};

type FollowOtherUser = {
  userId: string;
  isFollowing: boolean;
};

export const followOtherUser = ({ userId, isFollowing }: FollowOtherUser) => {
  const apiUrl = `users/follow/${userId}`;

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
