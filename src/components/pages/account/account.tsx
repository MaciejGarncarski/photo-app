'use client';

import { IconDoorExit, IconEdit } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/src/hooks/use-auth';
import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useModal } from '@/src/hooks/use-modal';
import { useUserByUsername } from '@/src/hooks/use-user-by-username';
import { signOut } from '@/src/utils/sign-out';

import { AccountPostsList } from '@/src/components/account-posts-list/account-posts-list';
import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal-item/list-modal-item';

import styles from './account.module.scss';

import { AccountHeaderDesktop } from './account-header-desktop';
import { AccountHeaderMobile } from './account-header-mobile';

type Props = {
  userId?: string;
};

export const Account = ({ userId }: Props) => {
  const { isMobile } = useIsMobile();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { sessionUser } = useAuth();
  const settingsModal = useModal();
  const signOutModal = useModal();

  const { data: userData } = useUserByUsername({
    username: pathname.slice(1) as string,
  });

  const isOwner = sessionUser?.id === (userId || userData?.id);

  const accountHeaderProps = {
    userId: userData?.id || '',
    isModalOpen: settingsModal.isModalOpen,
    openModal: settingsModal.openModal,
    isOwner,
  };

  return (
    <div className={styles.container}>
      {isMobile ? (
        <AccountHeaderMobile {...accountHeaderProps} />
      ) : (
        <AccountHeaderDesktop {...accountHeaderProps} />
      )}
      <ListModal
        isVisible={settingsModal.isModalOpen}
        closeModal={settingsModal.closeModal}
        headingText="Account options"
      >
        <ListModalItem
          type="link"
          href="/edit-account"
          icon={<IconEdit />}
          onClick={settingsModal.closeModal}
        >
          Edit account
        </ListModalItem>
        <ListModalItem
          type="button"
          onClick={signOutModal.openModal}
          icon={<IconDoorExit />}
        >
          Sign out
        </ListModalItem>
      </ListModal>
      <ConfirmationAlert
        isVisible={signOutModal.isModalOpen}
        text="Do you want to sign out?"
        onConfirm={() => signOut(queryClient)}
        closeModal={signOutModal.closeModal}
      />
      <AccountPostsList userId={userData?.id || ''} />
    </div>
  );
};
