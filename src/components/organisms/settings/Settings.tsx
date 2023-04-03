import { IconDoorExit, IconMoon, IconSun, IconUser } from '@tabler/icons-react';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useTheme } from '@/src/hooks/useTheme';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';

type PropsTypes = {
  closeModal: () => void;
  isVisible: boolean;
};

export const Settings = ({ closeModal, isVisible }: PropsTypes) => {
  const { theme, handleTheme } = useTheme();
  const { sessionUserData, signOut, isSignedIn } = useAuth();
  const signOutModal = useModal();

  const ThemeButton = () => {
    if (theme === 'dark') {
      return <IconMoon />;
    }
    return <IconSun />;
  };

  return (
    <>
      <ListModal isVisible={isVisible} closeModal={closeModal} headingText="PhotoApp settings">
        {isSignedIn && (
          <ListModalItem type="link" href={`/${sessionUserData.username}`} onClick={closeModal} icon={<IconUser />}>
            Your profile
          </ListModalItem>
        )}
        <ListModalItem type="button" onClick={handleTheme} isLast={!isSignedIn} icon={<ThemeButton />}>
          Change theme to {theme === 'dark' ? 'light' : 'dark'}
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
        onConfirm={signOut}
        closeModal={signOutModal.closeModal}
      />
    </>
  );
};
