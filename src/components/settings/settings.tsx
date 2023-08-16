import { IconDoorExit, IconMoon, IconSun, IconUser } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';

import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';
import { signOut } from '@/src/utils/sign-out';

import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal/list-modal-item';

type Props = {
  closeModal: () => void;
  isVisible: boolean;
};

export const Settings = ({ closeModal, isVisible }: Props) => {
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const { sessionUser, isSignedIn } = useAuth();
  const signOutModal = useModal();

  const handleSignOut = () => {
    signOut(queryClient);
    closeModal();
    signOutModal.closeModal();
  };

  const ThemeButton = () => {
    if (isDark) {
      return <IconMoon />;
    }
    return <IconSun />;
  };

  return (
    <>
      <ListModal
        isVisible={isVisible}
        closeModal={closeModal}
        headingText="PhotoApp settings"
        data-cy="settings modal"
      >
        {isSignedIn && sessionUser?.username && (
          <ListModalItem
            type="link"
            href={`/${sessionUser.username}`}
            onClick={closeModal}
            icon={<IconUser />}
          >
            Your profile
          </ListModalItem>
        )}
        <ListModalItem
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          isLast={!isSignedIn}
          icon={<ThemeButton />}
        >
          Change theme to {isDark ? 'light' : 'dark'}
        </ListModalItem>
        {isSignedIn && (
          <ListModalItem
            type="button"
            onClick={signOutModal.openModal}
            isLast
            icon={<IconDoorExit />}
          >
            Sign Out
          </ListModalItem>
        )}
      </ListModal>
      <ConfirmationAlert
        isVisible={signOutModal.isModalOpen}
        headingText="Sign out?"
        onConfirm={handleSignOut}
        closeModal={signOutModal.closeModal}
      />
    </>
  );
};
