import debounce from 'lodash.debounce';
import { useMemo } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { useNotificationSoundAtom } from '@/src/components/settings/use-notification-sound-atom';
import { useUpdatePreferences } from '@/src/components/settings/use-update-preferences';

export const useNotificationSoundPreference = () => {
  const { sessionUser, isSignedIn } = useAuth();
  const { mutate, isPending } = useUpdatePreferences();

  const { notificationSound, setNotificationSound } =
    useNotificationSoundAtom();

  const isSoundEnabled = isSignedIn
    ? sessionUser?.notificationSound === 'ON'
    : notificationSound === 'ON';

  if (isSignedIn) {
    setNotificationSound(sessionUser?.notificationSound || 'ON');
  }

  const debouncedNotificationSoundMutation = useMemo(
    () =>
      debounce(
        () =>
          mutate({
            notificationSound: notificationSound === 'ON' ? 'OFF' : 'ON',
          }),
        200,
      ),
    [mutate, notificationSound],
  );

  const toggleNotificationSound = () => {
    if (isSignedIn) {
      return debouncedNotificationSoundMutation();
    }

    setNotificationSound((sound) => (sound === 'ON' ? 'OFF' : 'ON'));
  };

  return {
    isSoundEnabled,
    toggleNotificationSound,
    isSoundMutationPending: isPending,
  };
};
