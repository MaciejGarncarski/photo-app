import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { apiClient } from '@/src/utils/api-client';

import { RegisterFormValues } from '@/src/schemas/auth.schema';

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, username, password }: RegisterFormValues) => {
      return apiClient({
        url: 'auth/register',
        method: 'POST',
        body: {
          email,
          username,
          password,
        },
      });
    },
    onSuccess: async () => {
      router.push('/');
      await queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
