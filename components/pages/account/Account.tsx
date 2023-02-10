import { IconEdit } from '@tabler/icons';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { IconSettingsWrapper } from '@/components/atoms/icons/IconSettingsWrapper';
import { Loading } from '@/components/atoms/loading/Loading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { ListModal } from '@/components/molecules/listModal/ListModal';
import { ListModalItem } from '@/components/molecules/listModal/ListModalItem';
import { AccountPosts } from '@/components/organisms/accountPosts/AccountPosts';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useUser } from '@/components/pages/account/useUser';

import styles from './account.module.scss';

export type AccountID = {
  id: string;
};

type AccountProps = {
  username: string;
};

const listData = ['posts', 'followers', 'following'] as const;

export const Account = ({ username: propsUsername }: AccountProps) => {
  const { session } = useAuth();
  const { isError, isLoading, id, name, username, bio, count } = useUser({ username: propsUsername });
  const { open, close, modalOpen } = useModal();

  if (isLoading || !count || !id) {
    return <Loading />;
  }

  if (isError) {
    return <p>user error</p>;
  }

  const isOwner = session?.user?.id === id;

  return (
    <div className={styles.container}>
      <NextSeo title={`@${username}`} />
      <main className={styles.account}>
        <Avatar className={styles.avatar} userId={id} />
        <motion.h2 initial={{ x: -10 }} animate={{ x: 0 }} className={styles.username}>
          {username}
        </motion.h2>
        <motion.ul initial={{ x: -10 }} animate={{ x: 0 }} className={styles.list}>
          {listData.map((item) => {
            return (
              <li className={styles.listItem} key={item}>
                <p className={styles.listItemNumber}>{count[item]}</p>
                <p className={styles.listItemText}>{item}</p>
              </li>
            );
          })}
        </motion.ul>
        <p className={styles.name}>{name}</p>
        <p className={styles.bio}>{bio ?? 'No bio yet.'}</p>
        {!isOwner && session && <FollowButton className={styles.followButton} userId={id} />}
        {isOwner && (
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileFocus={{ scale: 1.07 }}
            type="button"
            onClick={open}
            className={styles.menuButton}
          >
            <span className="visually-hidden">{modalOpen ? 'Close menu' : 'Open menu'}</span>
            <span className={styles.menuButtonText}>settings</span>
            <IconSettingsWrapper size="lg" />
          </motion.button>
        )}
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
      <AccountPosts id={id} />
    </div>
  );
};
