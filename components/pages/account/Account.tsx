import { IconDoorExit, IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { lock } from '@/utils/bodyLock';

import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { AccountPosts } from '@/components/organisms/accountPosts/AccountPosts';
import { ListModal } from '@/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/components/organisms/listModal/ListModalItem';
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
  });

  if (!userData.count) {
    return null;
  }

  if (isError) {
    return <p>user error</p>;
  }

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
