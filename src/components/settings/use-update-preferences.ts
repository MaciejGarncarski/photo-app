import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { useAuth } from '@/src/hooks/use-auth';
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

  const { sessionUser, isRefetching } = useAuth();

  useEffect(() => {
    if (!sessionUser || isRefetching) {
      return;
    }

    if (sessionUser.theme) {
      setTheme(sessionUser.theme);
    }
    if (sessionUser.notificationSound) {
      setNotificationSound(sessionUser.notificationSound);
    }
  }, [sessionUser, isRefetching, setTheme, setNotificationSound]);

  return useMutation({
    mutationFn: ({ theme, notificationSound }: MutationVariables) =>
      apiClient({
        method: 'POST',
        body: {
          theme,
          notificationSound,
        },
        url: 'user/preferences',
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
