import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import styles from './account.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Button } from '@/components/atoms/button/Button';
import { Loading } from '@/components/atoms/loading/Loading';
import { ModalOverlay } from '@/components/atoms/modalOverlay/ModalOverlay';
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

export const Account = ({ username }: AccountProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { session } = useAuth();
  const { data, isLoading } = useAccount({ username });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  if (!data || isLoading) {
    return <Loading />;
  }

  if (!data.user) {
    return <p>user error</p>;
  }

  const { name, bio } = data.user;
  const isOwner = session?.user?.id === data.user.id;

  return (
    <>
      <main className={styles.account}>
        <Avatar className={styles.avatar} userID={data.user.id} />
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
        {!isOwner && <Button className={styles.followButton}>follow 💪</Button>}
        {isOwner && (
          <button type='button' onClick={openMenu} className={styles.menuButton}>
            <span className='visually-hidden'>{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <AiOutlineMenu />
          </button>
        )}
      </main>
      {isMenuOpen && (
        <ModalOverlay setOpen={setIsMenuOpen}>
          <div role='dialog' className={styles.menu}>
            <ul className={styles.menuList}>
              <li>hej</li>
              <li>hej</li>
              <li>hej</li>
            </ul>
          </div>
        </ModalOverlay>
      )}
      <AccountPosts id={data.user.id} />
    </>
  );
};
