import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { RegisterFormValues } from '@/src/schemas/auth.schema';
import { registerUser } from '@/src/services/auth.service';

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      email,
      username,
      password,
      confirmPassword,
    }: RegisterFormValues) => {
      return registerUser({ email, confirmPassword, password, username });
    },
    onSuccess: async () => {
      router.push('/');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['session'] });
      }, 500);
    },
  });
};
