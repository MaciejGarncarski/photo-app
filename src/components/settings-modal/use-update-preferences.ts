import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { useNotificationSoundAtom } from '@/src/components/settings-modal/use-notification-sound-atom';
import { UserWithPreferences } from '@/src/schemas/user.schema';
import { updatePreferences } from '@/src/services/user.service';

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
    mutationFn: ({ theme, notificationSound }: MutationVariables) => {
      return updatePreferences({ notificationSound, theme });
    },
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
    onError: (err, newData, context) => {
      queryClient.setQueryData(['session'], context?.previousSession);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
