import {
  Moon,
  SignOut,
  SpeakerHigh,
  SpeakerLow,
  Sun,
  User,
} from '@phosphor-icons/react';
import { useCallback } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';

import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal-item/list-modal-item';
import { SignOutDialog } from '@/src/components/settings-modal/sign-out-dialog';
import { useNotificationSoundPreference } from '@/src/components/settings-modal/use-notification-sound-preference';
import { useThemePreference } from '@/src/components/settings-modal/use-theme-preference';

type Props = {
  closeSettingsModal: () => void;
  isVisible: boolean;
};

export const SettingsModal = ({ closeSettingsModal, isVisible }: Props) => {
  const { sessionUser, isSignedIn } = useAuth();
  const signOutModal = useModal();

  const { isSoundEnabled, toggleNotificationSound, isSoundMutationPending } =
    useNotificationSoundPreference();

  const { isDark, toggleTheme, isThemeMutationPending } = useThemePreference();

  const ThemeButton = useCallback(() => {
    if (isDark) {
      return <Moon />;
    }
    return <Sun />;
  }, [isDark]);

  const SoundIcon = useCallback(() => {
    if (isSoundEnabled) {
      return <SpeakerHigh />;
    }

    return <SpeakerLow />;
  }, [isSoundEnabled]);

  return (
    <>
      <RemoveScroll enabled={isVisible} forwardProps>
        <ListModal
          isVisible={isVisible}
          closeModal={closeSettingsModal}
          headingText="Settings"
          data-cy="settings modal"
        >
          {isSignedIn && sessionUser?.username && (
            <ListModalItem
              type="link"
              href={`/${sessionUser.username}`}
              onClick={closeSettingsModal}
              icon={<User />}
            >
              Your profile
            </ListModalItem>
          )}
          <ListModalItem
            type="button"
            onClick={toggleTheme}
            icon={<ThemeButton />}
            isPending={isThemeMutationPending}
            loadingText="Updating..."
          >
            Change theme to {isDark ? 'light' : 'dark'}
          </ListModalItem>
          {isSignedIn && (
            <>
              <ListModalItem
                type="button"
                onClick={toggleNotificationSound}
                icon={<SoundIcon />}
                isPending={isSoundMutationPending}
                loadingText="Updating..."
              >
                Turn {isSoundEnabled ? 'off' : 'on'} sound notifications
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
      </RemoveScroll>
      <SignOutDialog
        closeSettingsModal={closeSettingsModal}
        signOutModal={signOutModal}
      />
    </>
  );
};
