import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
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
  tag?: 'header' | 'div';
  post: PostData;
  className?: string;
  variant?: 'no-margin-left';
};

export const POST_AVATAR_SIZE = 40;

export const PostHeader = ({ tag: Tag = 'header', post, variant, className }: PostHeaderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { session } = useAuth();
  const { data } = useAccount({ userId: session?.user?.id });
  const { data: authorData } = useAccount({ userId: post.author_id });

  const queryClient = useQueryClient();

  const isAuthor = data?.user.id === post.author_id;

  const onModalOpen = () => setIsOpen(true);

  const headerClassName = clsx(className, variant && styles[variant], styles.header);

  if (!authorData) {
    return (
      <Tag className={headerClassName}>
        <Loading variants={['very-small', 'left']} />
      </Tag>
    );
  }

  const prefetchUser = async () => {
    await queryClient.prefetchQuery({
      queryKey: ['account', authorData.user.username],
    });
  };

  return (
    <>
      <Tag className={headerClassName}>
        <Link href={`/${authorData.user.username}`} className={styles.link} onClick={prefetchUser}>
          <Avatar userId={authorData.user.id} width={POST_AVATAR_SIZE} height={POST_AVATAR_SIZE} />
          <h2>{authorData.user.username}</h2>
        </Link>
        {data && (
          <div className={styles.options}>
            {!isAuthor && <FollowButton className={styles.followBtn} userId={post.author_id} />}
            <Tooltip variant="right" content="Post menu">
              <button type="button" className={styles.optionsButton} onClick={onModalOpen}>
                <AiOutlineMenu />
              </button>
            </Tooltip>
          </div>
        )}
      </Tag>
      <AnimatePresence>{isOpen && <PostOptions post={post} setIsOpen={setIsOpen} />}</AnimatePresence>
    </>
  );
};
