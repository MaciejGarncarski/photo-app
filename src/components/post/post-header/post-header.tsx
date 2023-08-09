import { IconMenu2 } from '@tabler/icons-react';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/useAuth';

import { PostHeaderPlaceholder } from '@/src/components/atoms/postHeaderPlaceholder/PostHeaderPlaceholder';
import { Tooltip } from '@/src/components/atoms/tooltip/Tooltip';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FollowButton } from '@/src/components/molecules/followButton/FollowButton';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { usePostHeader } from '@/src/components/organisms/post/postHeader/usePostHeader';

import styles from './PostHeader.module.scss';

import { PostOptions } from '../post-options/post-options';

type PropsTypes = {
  tag?: 'header' | 'div';
  authorId: string;
  createdAt: string;
  postId: number;
};

export const PostHeader = ({
  tag: Tag = 'header',
  authorId,
  createdAt,
  postId,
}: PropsTypes) => {
  const { isSignedIn, isLoading } = useAuth();
  const {
    dateFromNow,
    handleDeletePost,
    isAuthor,
    username,
    confirmationModal,
    menuModal,
  } = usePostHeader({
    authorId,
    createdAt,
    postId,
  });

  if (!username || isLoading) {
    return <PostHeaderPlaceholder />;
  }

  return (
    <Tag className={styles.header}>
      <Link href={`/${username}`} className={styles.userAnchor}>
        <Avatar userId={authorId} size="small" />
        <div>
          <h2 className={styles.username}>{username}</h2>
          <p>
            <time dateTime={createdAt.toString()}>{dateFromNow}</time>
          </p>
        </div>
      </Link>

      {isSignedIn && (
        <div className={styles.options}>
          {!isAuthor && <FollowButton userId={authorId} />}
          {isAuthor && (
            <Tooltip variant="right" content="Post options">
              <button
                type="button"
                className={styles.optionsButton}
                onClick={menuModal.openModal}
              >
                <IconMenu2 />
              </button>
            </Tooltip>
          )}
        </div>
      )}

      <PostOptions
        isVisible={menuModal.isModalOpen && !confirmationModal.isModalOpen}
        key="options"
        postId={postId}
        authorId={authorId}
        closeModal={menuModal.closeModal}
        openCnonfirmation={confirmationModal.openModal}
      />

      <ConfirmationAlert
        isVisible={confirmationModal.isModalOpen}
        key="confirmation"
        onConfirm={handleDeletePost}
        headingText="Delete post?"
        closeModal={confirmationModal.closeModal}
      />
    </Tag>
  );
};
