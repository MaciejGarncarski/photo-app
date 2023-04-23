import { apiClient } from '@/src/utils/apis/apiClient';

import { EditAccountInput } from '@/src/consts/schemas';
import { FollowersResponse } from '@/src/schemas/follower-stats';
import { User, userApiResponseSchema } from '@/src/schemas/user.schema';

type GetUser = {
  userId: string;
};

export const getUser = async ({ userId }: GetUser) => {
  const { data } = await apiClient.get(`users/${userId}`);
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
  const { data } = await apiClient.get(`users/username/${username}`);
  const response = userApiResponseSchema.safeParse(data);

  if (!response.success) {
    throw new Error(`Invalid data, ${JSON.stringify(response.error)}`);
  }

  return response.data;
};

type UploadAvatar = {
  avatarFile: Blob;
};

export const uploadAvatar = ({ avatarFile }: UploadAvatar) => {
  const formData = new FormData();
  formData.append('image', avatarFile);

  return apiClient.postForm(`session-user/update-avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteAvatar = () => {
  return apiClient.delete('session-user/delete-avatar');
};

export const editAccount = (data: EditAccountInput) => {
  return apiClient.post<unknown, unknown, EditAccountInput>(`session-user/edit-account`, data);
};

export const getSessionUser = async () => {
  const { data } = await apiClient.get<User>('auth/me');
  return data;
};

type FollowOtherUser = {
  userId: string;
  isFollowing: boolean;
};

export const followOtherUser = ({ userId, isFollowing }: FollowOtherUser) => {
  const apiUrl = `users/follow/${userId}`;

  if (isFollowing) {
    return apiClient.delete(apiUrl);
  }
  return apiClient.put(apiUrl);
};

type GetFollowers = {
  pageParam: number;
  type: 'followers' | 'friends';
  userId: string;
};

export const getFollowers = async ({ pageParam = 0, type, userId }: GetFollowers) => {
  const { data } = await apiClient.get<FollowersResponse>(
    `follower-stats/${type}?userId=${userId}&skip=${pageParam ?? 0}`,
  );
  return data;
};
