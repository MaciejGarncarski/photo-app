import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { DeleteAvatarData } from '@/pages/api/account/deleteAvatar';

export const useDeleteAvatar = () => {
  return useMutation(async ({ userId }: DeleteAvatarData) => {
    return await axios.delete(`/api/account/deleteAvatar?userId=${userId}`);
  });
};
