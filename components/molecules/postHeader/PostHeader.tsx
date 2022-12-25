import { useQueryClient } from '@tanstack/react-query';
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
  post: PostData;
};

const AVATAR_SIZE = 40;

export const PostHeader = ({ post }: PostHeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { session } = useAuth();
  const { data } = useAccount({ id: session?.user?.id });
  const { data: authorData } = useAccount({ id: post.author_id });

  const queryClient = useQueryClient();

  const isAuthor = data?.user.id === post.author_id;

  const onModalOpen = () => setIsOpen(true);

  if (!authorData) {
    return (
      <header className={styles.header}>
        <Loading variants={['very-small', 'left']} />
      </header>
    );
  }

  const prefetchUser = async () => {
    await queryClient.prefetchQuery({
      queryKey: [{ account: authorData.user.username }],
    });
  };

  return (
    <>
      <header className={styles.header}>
        <Link href={`/${authorData.user.username}`} className={styles.link} onClick={prefetchUser}>
          <Avatar userID={authorData.user.id} width={AVATAR_SIZE} height={AVATAR_SIZE} />
          <h2>{authorData.user.username}</h2>
        </Link>
        {data && (
          <div className={styles.options}>
            {!isAuthor && <FollowButton className={styles.followBtn} isFollowing={false} />}
            <Tooltip variant='right' content='Post menu'>
              <button type='button' className={styles.optionsButton} onClick={onModalOpen}>
                <AiOutlineMenu />
              </button>
            </Tooltip>
          </div>
        )}
      </header>
      <AnimatePresence>
        {isOpen && <PostOptions post={post} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
};
