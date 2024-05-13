import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const soundAtom = atomWithStorage<'ON' | 'OFF'>(
  'notificationSound',
  'ON',
  undefined,
  { getOnInit: true },
);

export const useNotificationSoundAtom = () => {
  const [notificationSound, setNotificationSound] = useAtom(soundAtom);
  return { notificationSound, setNotificationSound };
};
