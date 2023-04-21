import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { clientEnv } from '@/src/utils/env';

import { EditAccountInput } from '@/src/consts/schemas';

export const useEditAccount = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: EditAccountInput) => {
      return axios.post<unknown, unknown, EditAccountInput>(
        `${clientEnv.NEXT_PUBLIC_API_ROOT}api/session-user/edit-account`,
        data,
        { withCredentials: true },
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
      },
    },
  );
};
