'use client';

import { IconDoorExit, IconEdit } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { signOut } from '@/src/utils/sign-out';

import { AccountPostsList } from '@/src/components/account-posts-list/account-posts-list';
import { FetchErrorMessage } from '@/src/components/fetch-error-message/fetch-error-message';
import { Loader } from '@/src/components/loader/loader';
import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal/list-modal-item';
import { useAccount } from '@/src/components/pages/account/use-account';

import styles from './account.module.scss';

import { AccountHeaderDesktop } from './account-header-desktop';
import { AccountHeaderMobile } from './account-header-mobile';

type Props = {
  username?: string;
};

export const Account = ({ username: usernameFromProps }: Props) => {
  const { isMobile } = useIsMobile();

  const params = useParams();
  const queryClient = useQueryClient();
  const username = usernameFromProps || (params?.username as string);

  const { isOwner, settingsModal, signOutModal, userData, isError } =
    useAccount({
      username,
    });

  const accountHeaderProps = {
    userId: userData?.id || '',
    isModalOpen: settingsModal.isModalOpen,
    openModal: settingsModal.openModal,
    isOwner,
  };

  if (isError) {
    return <FetchErrorMessage message="Cannot display this profile." />;
  }

  if (!userData) {
    return <Loader marginTop color="blue" size="normal" />;
  }

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
          isLast
        >
          Sign out
        </ListModalItem>
      </ListModal>
      <ConfirmationAlert
        isVisible={signOutModal.isModalOpen}
        headingText="Sign out?"
        onConfirm={() => signOut(queryClient)}
        closeModal={signOutModal.closeModal}
      />
      <AccountPostsList userId={userData?.id || ''} />
    </div>
  );
};
