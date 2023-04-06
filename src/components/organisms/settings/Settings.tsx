import { IconDoorExit, IconMoon, IconSun, IconUser } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';
import { useTheme } from '@/src/components/organisms/settings/useTheme';

type PropsTypes = {
  closeModal: () => void;
  isVisible: boolean;
};

export const Settings = ({ closeModal, isVisible }: PropsTypes) => {
  const { isDark, changeTheme } = useTheme();
  const { data, isSignedIn } = useAuth();
  const signOutModal = useModal();

  const ThemeButton = () => {
    if (isDark) {
      return <IconMoon />;
    }
    return <IconSun />;
  };

  return (
    <>
      <ListModal isVisible={isVisible} closeModal={closeModal} headingText="PhotoApp settings">
        {data && (
          <ListModalItem type="link" href={`/${data.username}`} onClick={closeModal} icon={<IconUser />}>
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
        onConfirm={signOut}
        closeModal={signOutModal.closeModal}
      />
    </>
  );
};
