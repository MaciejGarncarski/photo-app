import { IconDoorExit, IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { NextSeo } from 'next-seo';

import { useIsMobile } from '@/src/hooks/useIsMobile';

import { Loader } from '@/src/components/molecules/loader/Loader';

import { AccountPosts } from '@/src/components/organisms/accountPosts/AccountPosts';
import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';
import { PostModal } from '@/src/components/organisms/postModal/PostModal';

import { useAccount } from '@/src/components/pages/account/useAccount';
import { usePost } from '@/src/components/pages/account/usePost';

import styles from './account.module.scss';

import { AccountHeaderDesktop } from './AccountHeaderDesktop';
import { AccountHeaderMobile } from './AccountHeaderMobile';

type PropsTypes = {
  isModalOpen?: boolean;
  postId?: number;
};

export const Account = ({ isModalOpen = false, postId }: PropsTypes) => {
  const { isMobile } = useIsMobile();
  const router = useRouter();
  const { data, isError } = usePost({ postId: Number(postId) });
  const username = postId ? data?.author?.username || '' : (router.query.username as string);

  const { isOwner, postModalClose, settingsModal, signOutModal, postModal, userData } = useAccount({
    username,
    isModalOpen,
  });

  const accountHeaderProps = {
    userId: userData?.id || '',
    isModalOpen: settingsModal.isModalOpen,
    openModal: settingsModal.openModal,
    isOwner,
  };

  if (isError || !userData) {
    return <Loader color="blue" size="normal" />;
  }

  return (
    <div className={styles.container}>
      <NextSeo title={`@${userData?.username}`} />
      {isMobile ? <AccountHeaderMobile {...accountHeaderProps} /> : <AccountHeaderDesktop {...accountHeaderProps} />}

      <ListModal
        isVisible={settingsModal.isModalOpen}
        closeModal={settingsModal.closeModal}
        headingText="Account options"
      >
        <ListModalItem type="link" href="/edit-account" icon={<IconEdit />} onClick={settingsModal.closeModal}>
          Edit account
        </ListModalItem>
        <ListModalItem type="button" onClick={signOutModal.openModal} icon={<IconDoorExit />} isLast>
          Sign out
        </ListModalItem>
      </ListModal>
      <ConfirmationAlert
        isVisible={signOutModal.isModalOpen}
        headingText="Sign out?"
        onConfirm={signOut}
        closeModal={signOutModal.closeModal}
      />
      {data && <PostModal isVisible={postModal.isModalOpen} post={data} closeModal={postModalClose} />}
      <AccountPosts userId={userData?.id || ''} />
    </div>
  );
};
