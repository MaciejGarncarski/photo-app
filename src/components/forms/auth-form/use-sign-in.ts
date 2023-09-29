import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { apiClient } from '@/src/utils/api-client';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-posts';
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
    onSuccess: () => {
      router.replace('/');

      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: ['session'] });
        await queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY });
      }, 1000);
    },
  });
};
