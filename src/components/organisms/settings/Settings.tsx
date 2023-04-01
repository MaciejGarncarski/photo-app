import { IconDoorExit, IconMoon, IconSun, IconUser } from '@tabler/icons-react';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { useModal } from '@/components/molecules/modal/useModal';
import { ListModal } from '@/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/components/organisms/listModal/ListModalItem';

type PropsTypes = {
  close: () => void;
  isVisible: boolean;
};

export const Settings = ({ close, isVisible }: PropsTypes) => {
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
      <ListModal isVisible={isVisible} close={close} headingText="PhotoApp settings">
        {isSignedIn && (
          <ListModalItem type="link" href={`/${sessionUserData.username}`} onClick={close} icon={<IconUser />}>
            Your profile
          </ListModalItem>
        )}
        <ListModalItem type="button" onClick={handleTheme} isLast={!isSignedIn} icon={<ThemeButton />}>
          Change theme to {theme === 'dark' ? 'light' : 'dark'}
        </ListModalItem>
        {isSignedIn && (
          <ListModalItem type="button" onClick={signOutModal.open} isLast icon={<IconDoorExit />}>
            Sign Out
          </ListModalItem>
        )}
      </ListModal>
      <ConfirmationAlert
        isVisible={signOutModal.modalOpen}
        headingText="Sign out?"
        onConfirm={signOut}
        close={signOutModal.close}
      />
    </>
  );
};
