import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import debounce from 'lodash.debounce';
import { useEffect, useMemo } from 'react';

import { useAuth } from '@/src/hooks/use-auth';

import { useUpdatePreferences } from '@/src/components/settings/use-update-preferences';

export const soundAtom = atomWithStorage<'ON' | 'OFF'>(
  'notificationSound',
  'ON',
);

export const useNotificationSoundPreference = () => {
  const [notificationSound, setNotificationSound] = useAtom(soundAtom);
  const { sessionUser, isSignedIn } = useAuth();
  const { mutate, isPending } = useUpdatePreferences();

  useEffect(() => {
    if (sessionUser?.notificationSound) {
      setNotificationSound(sessionUser.notificationSound);
    }
  }, [sessionUser?.notificationSound, setNotificationSound]);

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
