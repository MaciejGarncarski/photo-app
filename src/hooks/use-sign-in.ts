import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { apiClient } from '@/src/utils/api-client';

import { SignInFormValues } from '@/src/schemas/sign-in.schema';

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: SignInFormValues) => {
      return apiClient.post('auth/login', {
        email,
        password,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push('/');
    },
  });
};
