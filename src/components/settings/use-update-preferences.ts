import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';

import { apiClient } from '@/src/utils/api-client';

import { useNotificationSoundAtom } from '@/src/components/settings/use-notification-sound-atom';
import { UserWithPreferences } from '@/src/schemas/user.schema';

type MutationVariables = {
  theme?: 'DARK' | 'LIGHT';
  notificationSound?: 'ON' | 'OFF';
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();
  const { setTheme } = useTheme();
  const { setNotificationSound } = useNotificationSoundAtom();

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

      if (newPreferences.notificationSound) {
        setNotificationSound(newPreferences.notificationSound);
      }

      if (newPreferences.theme) {
        setTheme(newPreferences.theme);
      }

      return { previousSession };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['session'], context?.previousSession);
      const previousPreferences = context?.previousSession;

      setNotificationSound(previousPreferences?.notificationSound || 'ON');
      setTheme(previousPreferences?.theme || 'LIGHT');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
