import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { RegisterFormValues } from '@/src/schemas/auth.schema';
import { registerUser } from '@/src/services/auth.service';

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
    onSuccess: async () => {
      router.push('/');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['session'] });
      }, 500);
    },
  });
};
