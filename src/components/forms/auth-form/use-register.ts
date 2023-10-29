import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useRedirect } from '@/src/components/forms/auth-form/use-redirect';
import { RegisterFormValues } from '@/src/schemas/auth.schema';
import { registerUser } from '@/src/services/auth.service';

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { redirectPath } = useRedirect();

  return useMutation({
    mutationFn: async ({
      email,
      username,
      password,
      confirmPassword,
    }: RegisterFormValues) => {
      try {
        const { data } = await registerUser({
          email,
          confirmPassword,
          password,
          username,
        });
        return data.data;
      } catch (err) {
        if (err instanceof registerUser.Error) {
          const { data } = err.getActualType();
          throw new Error(data.message);
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      if (redirectPath) {
        router.replace(redirectPath);
      }
      if (!redirectPath) {
        router.replace('/');
      }
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['session'] });
      }, 500);
    },
  });
};
