import {
  Moon,
  SignOut,
  SpeakerHigh,
  SpeakerLow,
  Sun,
  User,
} from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';
import { signOut } from '@/src/utils/sign-out';

import { Button } from '@/src/components/buttons/button/button';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';
import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal-item/list-modal-item';

type Props = {
  closeModal: () => void;
  isVisible: boolean;
};

export const soundAtom = atomWithStorage<'true' | 'false'>('soundOn', 'true');

export const Settings = ({ closeModal, isVisible }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { sessionUser, isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();
  const signOutModal = useModal();
  const [isSoundEnabled, setSoundEnabled] = useAtom(soundAtom);

  const isDark = useMemo(() => theme === 'dark', [theme]);

  const handleSignOut = () => {
    signOut(queryClient, () => router.push('/'));
    closeModal();
    signOutModal.closeModal();
  };

  const ThemeButton = () => {
    if (isDark) {
      return <Moon />;
    }
    return <Sun />;
  };

  const handleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const SoundIcon = () => {
    if (isSoundEnabled === 'true') {
      return <SpeakerHigh />;
    }
    return <SpeakerLow />;
  };

  const handleSound = () => {
    setSoundEnabled(isSoundEnabled === 'true' ? 'false' : 'true');
  };

  return (
    <>
      <ListModal
        isVisible={isVisible}
        closeModal={closeModal}
        headingText="Settings"
        data-cy="settings modal"
      >
        {isSignedIn && sessionUser?.username && (
          <ListModalItem
            type="link"
            href={`/${sessionUser.username}`}
            onClick={closeModal}
            icon={<User />}
          >
            Your profile
          </ListModalItem>
        )}
        <ListModalItem
          type="button"
          onClick={handleTheme}
          icon={<ThemeButton />}
        >
          Change theme to {isDark ? 'light' : 'dark'}
        </ListModalItem>
        {isSignedIn && (
          <>
            <ListModalItem
              type="button"
              onClick={handleSound}
              icon={<SoundIcon />}
            >
              Turn {isSoundEnabled === 'true' ? 'off' : 'on'} sound
              notifications
            </ListModalItem>
            <ListModalItem
              type="button"
              onClick={signOutModal.openModal}
              icon={<SignOut />}
            >
              Sign Out
            </ListModalItem>
          </>
        )}
      </ListModal>
      <ConfirmationDialog
        isVisible={signOutModal.isModalOpen}
        text="Do you want to sign out?"
        closeModal={signOutModal.closeModal}
      >
        <Button variant="primary" onClick={handleSignOut}>
          <SignOut />
          Sign out
        </Button>
        <Button variant="secondary" onClick={signOutModal.closeModal}>
          Cancel
        </Button>
      </ConfirmationDialog>
    </>
  );
};
