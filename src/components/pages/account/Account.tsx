import { IconDoorExit, IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';
import { lock } from '@/src/utils/bodyLock';

import { ConfirmationAlert } from '@/src/components/molecules/confirmationAlert/ConfirmationAlert';
import { useModal } from '@/src/components/molecules/modal/useModal';
import { AccountPosts } from '@/src/components/organisms/accountPosts/AccountPosts';
import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';
import { PostModal } from '@/src/components/organisms/postModal/PostModal';
import { usePost } from '@/src/components/pages/account/usePost';

import styles from './account.module.scss';

import { AccountHeaderDesktop } from './AccountHeaderDesktop';
import { AccountHeaderMobile } from './AccountHeaderMobile';

export type AccountID = {
  id: string;
};

type PropsTypes = {
  username: string;
  isModalOpen?: boolean;
  postId?: number;
};

export const Account = ({ username, isModalOpen, postId }: PropsTypes) => {
  const router = useRouter();
  const { signOut, sessionUserData } = useAuth();
  const userData = useUser({ username });
  const { data, isError } = usePost({ postId: Number(postId) });

  const postModal = useModal(isModalOpen);
  const settingsModal = useModal();
  const signOutModal = useModal();

  const { id } = userData;

  const isOwner = sessionUserData.id === id;

  useEffect(() => {
    if (isModalOpen) {
      lock();
    }
  }, [isModalOpen]);

  const postModalClose = () => {
    postModal.close();
    router.push(`/${username}`);
  };

  const accountHeaderProps = {
    username,
    modalOpen: settingsModal.modalOpen,
    open: settingsModal.open,
    isOwner,
  };

  if (isError) {
    return <p>user error</p>;
  }

  return (
    <div className={styles.container}>
      <NextSeo title={`@${username}`} />
      <AccountHeaderMobile {...accountHeaderProps} />
      <AccountHeaderDesktop {...accountHeaderProps} />

      <ListModal isVisible={settingsModal.modalOpen} close={settingsModal.close} headingText="Account options">
        <ListModalItem type="link" href="/edit-account" icon={<IconEdit />} onClick={settingsModal.close}>
          Edit account
        </ListModalItem>
        <ListModalItem type="button" onClick={signOutModal.open} icon={<IconDoorExit />} isLast>
          Sign out
        </ListModalItem>
      </ListModal>
      <ConfirmationAlert
        isVisible={signOutModal.modalOpen}
        headingText="Sign out?"
        onConfirm={signOut}
        close={signOutModal.close}
      />
      {data && <PostModal isVisible={postModal.modalOpen} post={data} close={postModalClose} />}
      <AccountPosts id={id ?? ''} />
    </div>
  );
};
