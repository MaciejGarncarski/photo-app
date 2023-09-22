import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { apiClient } from '@/src/utils/api-client';

import { SignInFormValues } from '@/src/schemas/auth.schema';

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: SignInFormValues) => {
      return apiClient({
        url: 'auth/sign-in',
        method: 'POST',
        body: {
          email,
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
