import {
  Moon,
  SignOut,
  SpeakerHigh,
  SpeakerLow,
  Sun,
  User,
} from '@phosphor-icons/react';

import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';

import { Loader } from '@/src/components/loader/loader';
import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal-item/list-modal-item';
import { SignOutDialog } from '@/src/components/settings/sign-out-dialog';
import { useNotificationSoundPreference } from '@/src/components/settings/use-notification-sound-preference';
import { useThemePreference } from '@/src/components/settings/use-theme-preference';

type Props = {
  closeSettingsModal: () => void;
  isVisible: boolean;
};

export const Settings = ({ closeSettingsModal, isVisible }: Props) => {
  const { sessionUser, isSignedIn } = useAuth();
  const signOutModal = useModal();

  const {
    isSoundEnabled,
    toggleNotificationSound,
    isNotificationSoundMutationPending,
  } = useNotificationSoundPreference();

  const { isDark, toggleTheme, isThemeMutationPending } = useThemePreference();

  const ThemeButton = () => {
    if (isDark) {
      return <Moon />;
    }
    return <Sun />;
  };

  const SoundIcon = () => {
    if (isSoundEnabled) {
      return <SpeakerHigh />;
    }
    return <SpeakerLow />;
  };

  return (
    <>
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
          icon={
            isThemeMutationPending ? (
              <Loader color="primary" size="small" />
            ) : (
              <ThemeButton />
            )
          }
          disabled={isThemeMutationPending}
        >
          {isThemeMutationPending
            ? 'Updating...'
            : `Change theme to ${isDark ? 'light' : 'dark'}`}
        </ListModalItem>
        {isSignedIn && (
          <>
            <ListModalItem
              type="button"
              onClick={toggleNotificationSound}
              disabled={isNotificationSoundMutationPending}
              icon={
                isNotificationSoundMutationPending ? (
                  <Loader color="primary" size="small" />
                ) : (
                  <SoundIcon />
                )
              }
            >
              {isNotificationSoundMutationPending
                ? 'Updating...'
                : `Turn ${isSoundEnabled ? 'off' : 'on'} sound notifications`}
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
      <SignOutDialog
        closeSettingsModal={closeSettingsModal}
        signOutModal={signOutModal}
      />
    </>
  );
};
