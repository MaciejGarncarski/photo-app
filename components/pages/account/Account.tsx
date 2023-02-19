import { IconEdit } from '@tabler/icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { string } from '@/utils/string';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Button } from '@/components/atoms/button/Button';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { IconSettingsWrapper } from '@/components/atoms/icons/IconSettingsWrapper';
import { Loading } from '@/components/atoms/loading/Loading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { ListModal } from '@/components/molecules/listModal/ListModal';
import { ListModalItem } from '@/components/molecules/listModal/ListModalItem';
import { AccountPosts } from '@/components/organisms/accountPosts/AccountPosts';
import { PostModal } from '@/components/organisms/postModal/PostModal';
import { usePost } from '@/components/pages/account/usePost';

import styles from './account.module.scss';

export type AccountID = {
  id: string;
};

type AccountProps = {
  username: string;
  isModalOpen?: boolean;
};

const listData = ['posts', 'followers', 'following'] as const;

export const Account = ({ username: propsUsername, isModalOpen }: AccountProps) => {
  const { session } = useAuth();
  const { isError, isLoading, id, name, username, bio, count, customImage, image } = useUser({
    username: propsUsername,
  });

  const postModal = useModal(isModalOpen);
  const { open, close, modalOpen } = useModal();
  const router = useRouter();
  const { data } = usePost({ postId: Number(string(router.query.id)) });

  const postModalClose = () => {
    postModal.close();
    router.push(`/${propsUsername}`);
  };

  if (isLoading || !count || !id) {
    return <Loading />;
  }

  if (isError) {
    return <p>user error</p>;
  }

  const isOwner = session?.user?.id === id;

  return (
    <div className={styles.container}>
      <NextSeo
        title={`@${username}`}
        openGraph={{
          title: `${username} profile`,
          description: bio ?? '',
          url: `https://photo-app-orpin.vercel.app/${username}`,
          type: 'profile',
          images: [
            {
              url: customImage ?? image ?? '',
              alt: 'Profile photo',
            },
          ],
          profile: {
            username: username ?? '',
            firstName: name ?? '',
          },
        }}
      />
      <main className={styles.account}>
        <motion.h2 className={styles.username}>{username}</motion.h2>
        <Avatar className={styles.avatar} userId={id} />
        <motion.ul className={styles.list}>
          {listData.map((item) => {
            return (
              <li className={styles.listItem} key={item}>
                <p className={styles.listItemNumber}>{count[item]}</p>
                <p className={styles.listItemText}>{item}</p>
              </li>
            );
          })}
        </motion.ul>
        {!isOwner && session && <FollowButton className={styles.button} userId={id} />}
        {isOwner && (
          <Button type="button" onClick={open} className={styles.button}>
            <IconSettingsWrapper size="sm" />
            <span className={styles.menuButtonText}>settings</span>
            <VisuallyHiddenText text={modalOpen ? 'Close menu' : 'Open menu'} />
          </Button>
        )}
        <p className={styles.name}>{name}</p>
        <p className={styles.bio}>{bio || 'No bio yet.'}</p>
      </main>
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
      <AccountPosts id={id} />
    </div>
  );
};
