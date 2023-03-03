import { IconDoorExit, IconEdit } from '@tabler/icons';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { lock } from '@/utils/bodyLock';

import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { ListModal } from '@/components/molecules/listModal/ListModal';
import { ListModalItem } from '@/components/molecules/listModal/ListModalItem';
import { AccountPosts } from '@/components/organisms/accountPosts/AccountPosts';
import { PostModal } from '@/components/organisms/postModal/PostModal';
import { usePost } from '@/components/pages/account/usePost';

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
  const { signOut, sessionUserData } = useAuth();
  const userData = useUser({ username });
  const { data, isError } = usePost({ postId: Number(postId) });

  const postModal = useModal(isModalOpen);
  const settingsModal = useModal();
  const signOutModal = useModal();

  useEffect(() => {
    if (isModalOpen) {
      lock();
    }
  }, [isModalOpen]);

  const router = useRouter();

  if (!userData.count) {
    return null;
  }

  if (isError) {
    return <p>user error</p>;
  }

  const { id } = userData;

  const postModalClose = () => {
    postModal.close();
    router.push(`/${username}`);
  };

  const isOwner = sessionUserData.id === id;

  const accountHeaderProps = {
    username,
    modalOpen: settingsModal.modalOpen,
    open: settingsModal.open,
    isOwner,
  };

  return (
    <div className={styles.container}>
      <NextSeo title={`@${username}`} />
      <AccountHeaderMobile {...accountHeaderProps} />
      <AccountHeaderDesktop {...accountHeaderProps} />

      <ModalContainer>
        {settingsModal.modalOpen && (
          <ListModal close={settingsModal.close} headingText="Account options">
            <ListModalItem type="link" href="/edit-account" icon={<IconEdit />}>
              Edit account
            </ListModalItem>
            <ListModalItem type="button" onClick={signOutModal.open} icon={<IconDoorExit />} isLast>
              Sign out
            </ListModalItem>
          </ListModal>
        )}
      </ModalContainer>
      <ModalContainer>
        {signOutModal.modalOpen && (
          <ConfirmationAlert headingText="Sign out?" onConfirm={signOut} onCancel={signOutModal.close} close={close} />
        )}
      </ModalContainer>
      <ModalContainer>
        {postModal.modalOpen && data && (
          <PostModal modalOpen={postModal.modalOpen} post={data} close={postModalClose} />
        )}
      </ModalContainer>
      <AccountPosts id={id ?? ''} />
    </div>
  );
};
