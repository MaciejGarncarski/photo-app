import { apiClient } from '@/src/utils/apis/apiClient';

import { UserApiResponse } from '@/src/pages/api/account/userId/[userId]';

export const fetchAccount = async (userId: string) => {
  const { data } = await apiClient.get<UserApiResponse>(`account/userId/${userId}`);
  return data;
};
