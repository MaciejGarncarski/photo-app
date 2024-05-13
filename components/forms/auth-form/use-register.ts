import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { RegisterFormValues } from '@/schemas/auth.schema';
import { registerUser } from '@/services/auth.service';

export const useRegister = () => {
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
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['session'] });
      }, 500);
    },
  });
};
