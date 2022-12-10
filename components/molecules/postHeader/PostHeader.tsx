import { User } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import styles from './postHeader.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { PostOptions } from '@/components/molecules/postOptions/PostOptions';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

type PostHeaderProps = {
  user: User;
  postID: number;
};

const AVATAR_SIZE = 40;

export const PostHeader = ({ user, postID }: PostHeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { session } = useAuth();
  const { data } = useAccount({ id: session?.user?.id });

  const isAbleToModify = user.id === data?.user.id || data?.user.role === 'ADMIN';
  const onModalOpen = () => setIsOpen(true);

  return (
    <>
      <header className={styles.header}>
        <Link href={`/${user.username}`} className={styles.link}>
          <Avatar userID={user.id} width={AVATAR_SIZE} height={AVATAR_SIZE} alt='' />
          <h2>{user.username}</h2>
        </Link>
        <div className={styles.options}>
          <FollowButton className={styles.followBtn} isFollowing={false} />
          {isAbleToModify && (
            <button type='button' className={styles.optionsButton} onClick={onModalOpen}>
              <AiOutlineMenu />
            </button>
          )}
        </div>
      </header>
      <AnimatePresence>
        {isOpen && <PostOptions postID={postID} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
};
