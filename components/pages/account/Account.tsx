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
import { useAccount } from '@/components/pages/account/useAccount';

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
  const { data, isLoading } = useAccount({ username: propsUsername });
  const { open, close, modalOpen } = useModal();

  if (!data || isLoading) {
    return <Loading />;
  }

  if (!data.user) {
    return <p>user error</p>;
  }

  const { name, bio, username } = data.user;
  const isOwner = session?.user?.id === data.user.id;

  if (!username || !name) {
    return null;
  }

  return (
    <div className={styles.container}>
      <NextSeo title={`@${username}`} />
      <main className={styles.account}>
        <Avatar className={styles.avatar} userId={data.user.id} />
        <motion.h2 initial={{ x: -10 }} animate={{ x: 0 }} className={styles.username}>
          {username}
        </motion.h2>
        <motion.ul initial={{ x: -10 }} animate={{ x: 0 }} className={styles.list}>
          {listData.map((item) => {
            return (
              <li className={styles.listItem} key={item}>
                <p className={styles.listItemNumber}>{data.count[item]}</p>
                <p className={styles.listItemText}>{item}</p>
              </li>
            );
          })}
        </motion.ul>
        <p className={styles.name}>{name}</p>
        <p className={styles.bio}>{bio ?? 'No bio yet.'}</p>
        {!isOwner && session && <FollowButton className={styles.followButton} userId={data.user.id} />}
        {isOwner && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileFocus={{ scale: 1.1 }}
            type="button"
            onClick={open}
            className={styles.menuButton}
          >
            <span className="visually-hidden">{modalOpen ? 'Close menu' : 'Open menu'}</span>
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

      <AccountPosts id={data.user.id} />
    </div>
  );
};
