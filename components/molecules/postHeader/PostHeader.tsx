import { User } from '@prisma/client';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import styles from './postHeader.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { Loading } from '@/components/atoms/loading/Loading';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { PostOptions } from '@/components/molecules/postOptions/PostOptions';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

type PostHeaderProps = {
  user?: User;
  post: PostData;
};

const AVATAR_SIZE = 40;

export const PostHeader = ({ user, post }: PostHeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { session } = useAuth();
  const { data } = useAccount({ id: session?.user?.id });

  const isAuthor = data?.user.id === post.author_id;

  const onModalOpen = () => setIsOpen(true);

  if (!user) {
    return (
      <header className={styles.header}>
        <Loading variants={['very-small', 'left']} />
      </header>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <Link href={`/${user.username}`} className={styles.link}>
          <Avatar userID={user.id} width={AVATAR_SIZE} height={AVATAR_SIZE} alt='' />
          <h2>{user.username}</h2>
        </Link>
        <div className={styles.options}>
          {!isAuthor && <FollowButton className={styles.followBtn} isFollowing={false} />}
          <Tooltip variant='right' content='Post menu'>
            <button type='button' className={styles.optionsButton} onClick={onModalOpen}>
              <AiOutlineMenu />
            </button>
          </Tooltip>
        </div>
      </header>
      <AnimatePresence>
        {isOpen && <PostOptions post={post} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
};
