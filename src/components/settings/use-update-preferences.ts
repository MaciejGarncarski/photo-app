import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/api-client';

import { UserWithPreferences } from '@/src/schemas/user.schema';

type MutationVariables = {
  theme?: 'DARK' | 'LIGHT';
  notificationSound?: 'ON' | 'OFF';
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ theme, notificationSound }: MutationVariables) =>
      apiClient({
        method: 'POST',
        body: {
          theme,
          notificationSound,
        },
        url: 'users/preferences',
      }),
    onMutate: async (newPreferences) => {
      await queryClient.cancelQueries({ queryKey: ['session'] });
      const previousSession = queryClient.getQueryData<UserWithPreferences>([
        'session',
      ]);
      queryClient.setQueryData<UserWithPreferences>(['session'], (old) => {
        if (!old) {
          return;
        }

        return {
          ...old,
          ...newPreferences,
        };
      });

      return { previousSession };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['session'], context?.previousSession);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
