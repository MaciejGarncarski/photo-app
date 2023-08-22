import { IconDoorExit, IconMoon, IconSun, IconUser } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';
import { signOut } from '@/src/utils/sign-out';

import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal-item/list-modal-item';

type Props = {
  closeModal: () => void;
  isVisible: boolean;
};

export const Settings = ({ closeModal, isVisible }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { sessionUser, isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();
  const signOutModal = useModal();

  const isDark = useMemo(() => theme === 'dark', [theme]);

  const handleSignOut = () => {
    signOut(queryClient, () => router.push('/'));
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
        headingText="Settings"
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
          icon={<ThemeButton />}
        >
          Change theme to {isDark ? 'light' : 'dark'}
        </ListModalItem>
        {isSignedIn && (
          <ListModalItem
            type="button"
            onClick={signOutModal.openModal}
            icon={<IconDoorExit />}
          >
            Sign Out
          </ListModalItem>
        )}
      </ListModal>
      <ConfirmationAlert
        isVisible={signOutModal.isModalOpen}
        text="Do you want to sign out?"
        onConfirm={handleSignOut}
        closeModal={signOutModal.closeModal}
      />
    </>
  );
};
