import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useRedirect } from '@/src/components/forms/auth-form/use-redirect';
import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-homepage-posts';
import { SignInFormValues } from '@/src/schemas/auth.schema';
import { signIn } from '@/src/services/auth.service';

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { redirectPath } = useRedirect();

  return useMutation({
    mutationFn: async ({ email, password }: SignInFormValues) => {
      try {
        const request = await signIn({ email, password });
        return request.data;
      } catch (err) {
        if (err instanceof signIn.Error) {
          const { data } = err.getActualType();
          throw new Error(data.message);
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      if (redirectPath) {
        router.replace(redirectPath);
      }
      if (!redirectPath) {
        router.replace('/');
      }
      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: ['session'] });
        await queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY });
      }, 1000);
    },
  });
};
