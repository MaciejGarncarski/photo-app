import { IconDoorExit, IconMoon, IconSun, IconUser } from '@tabler/icons';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';

import { ConfirmationAlert } from '../confirmationAlert/ConfirmationAlert';
import { ListModal } from '../listModal/ListModal';
import { ListModalItem } from '../listModal/ListModalItem';

type PropsTypes = {
  close: () => void;
};

export const Settings = ({ close }: PropsTypes) => {
  const { theme, handleTheme } = useTheme();
  const { sessionUserData, signOut } = useAuth();
  const signOutModal = useModal();

  const ThemeButton = () => {
    if (theme === 'dark') {
      return <IconMoon />;
    }
    return <IconSun />;
  };

  return (
    <>
      <ListModal close={close} headingText={`Hi ${sessionUserData.username}`}>
        <ListModalItem type="link" href={`/${sessionUserData.username}`} icon={<IconUser />}>
          Your profile
        </ListModalItem>
        <ListModalItem type="button" onClick={handleTheme} icon={<ThemeButton />}>
          Change theme to {theme === 'dark' ? 'light' : 'dark'}
        </ListModalItem>
        <ListModalItem type="button" onClick={signOutModal.open} isLast icon={<IconDoorExit />}>
          Sign Out
        </ListModalItem>
      </ListModal>
      <ModalContainer>
        {signOutModal.modalOpen && (
          <ConfirmationAlert headingText="Sign out?" onConfirm={signOut} close={signOutModal.close} />
        )}
      </ModalContainer>
    </>
  );
};
