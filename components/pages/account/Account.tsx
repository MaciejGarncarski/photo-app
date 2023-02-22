import { IconEdit } from '@tabler/icons';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useUser } from '@/hooks/useUser';

import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
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

export const listData = ['posts', 'followers', 'following'] as const;

export const Account = ({ username, isModalOpen, postId }: PropsTypes) => {
  const { session } = useAuth();
  const userData = useUser({ username });
  const { data, isError } = usePost({ postId: Number(postId) });
  const { isMobile } = useScreenWidth();

  const postModal = useModal(isModalOpen);
  const { open, close, modalOpen } = useModal();
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

  const isOwner = session?.user?.id === id;

  return (
    <div className={styles.container}>
      <NextSeo title={`@${username}`} />
      {isMobile ? (
        <AccountHeaderMobile username={username} modalOpen={modalOpen} open={open} isOwner={isOwner} />
      ) : (
        <AccountHeaderDesktop username={username} modalOpen={modalOpen} open={open} isOwner={isOwner} />
      )}
      <ModalContainer>
        {modalOpen && (
          <ListModal close={close} headingText="Account options">
            <ListModalItem type="link" href="/edit-account" icon={<IconEdit />} isLast>
              Edit account
            </ListModalItem>
          </ListModal>
        )}
      </ModalContainer>
      <ModalContainer>{postModal.modalOpen && data && <PostModal post={data} close={postModalClose} />}</ModalContainer>
      <AccountPosts id={id ?? ''} />
    </div>
  );
};
