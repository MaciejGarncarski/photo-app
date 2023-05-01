import { IconDoorExit, IconMoon, IconSun, IconUser } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { signOut } from '@/src/utils/signOut';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';
import { useTheme } from '@/src/components/organisms/settings/useTheme';

type PropsTypes = {
  closeModal: () => void;
  isVisible: boolean;
};

export const Settings = ({ closeModal, isVisible }: PropsTypes) => {
  const queryClient = useQueryClient();
  const { isDark, changeTheme } = useTheme();
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
      <ListModal isVisible={isVisible} closeModal={closeModal} headingText="PhotoApp settings">
        {isSignedIn && sessionUser?.username && (
          <ListModalItem type="link" href={`/${sessionUser.username}`} onClick={closeModal} icon={<IconUser />}>
            Your profile
          </ListModalItem>
        )}
        <ListModalItem type="button" onClick={changeTheme} isLast={!isSignedIn} icon={<ThemeButton />}>
          Change theme to {isDark ? 'light' : 'dark'}
        </ListModalItem>
        {isSignedIn && (
          <ListModalItem type="button" onClick={signOutModal.openModal} isLast icon={<IconDoorExit />}>
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
