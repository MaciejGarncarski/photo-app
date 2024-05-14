import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/use-homepage-posts';
import { SignInFormValues } from '@/schemas/auth.schema';
import { signIn } from '@/services/auth.service';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }: SignInFormValues) => {
      try {
        const request = await signIn({ email, password });

        await queryClient.invalidateQueries({ queryKey: ['session'] });
        await queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY });

        router.push('/');

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['session'] });
      await queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY });
    },
  });
};
