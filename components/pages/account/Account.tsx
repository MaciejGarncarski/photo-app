import { IconEdit } from '@tabler/icons';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import styles from './account.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { IconSettingsWrapper } from '@/components/atoms/icons/IconSettingsWrapper';
import { Loading } from '@/components/atoms/loading/Loading';
import { Modal } from '@/components/atoms/modal/Modal';
import { AccountPosts } from '@/components/organisms/accountPosts/AccountPosts';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

export type AccountID = {
  id: string;
};

type AccountProps = {
  username: string;
};

const listData = ['posts', 'followers', 'following'] as const;

export const Account = ({ username: propsUsername }: AccountProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { session } = useAuth();
  const { data, isLoading } = useAccount({ username: propsUsername });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  if (!data || isLoading) {
    return <Loading />;
  }

  if (!data.user) {
    return <p>user error</p>;
  }

  const { name, bio, username, image } = data.user;
  const isOwner = session?.user?.id === data.user.id;

  if (!username || !name || !image) {
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
                <p>{item}</p>
              </li>
            );
          })}
        </motion.ul>
        <p className={styles.name}>{name}</p>
        <p className={styles.bio}>{bio ?? 'No bio yet.'}</p>
        {!isOwner && session && <FollowButton className={styles.followButton} userId={data.user.id} />}
        {isOwner && (
          <button type="button" onClick={openMenu} className={styles.menuButton}>
            <span className="visually-hidden">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <IconSettingsWrapper size="lg" />
          </button>
        )}
      </main>
      {isMenuOpen && (
        <Modal.Overlay setOpen={setIsMenuOpen}>
          <Modal.Container>
            <Modal.Close onClose={() => setIsMenuOpen(false)} />
            <Modal.List>
              <Modal.ListItem withLink href="/edit-account" isFirst>
                <IconEdit /> Edit account
              </Modal.ListItem>
            </Modal.List>
          </Modal.Container>
        </Modal.Overlay>
      )}

      <AccountPosts id={data.user.id} />
    </div>
  );
};
