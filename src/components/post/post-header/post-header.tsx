import { IconDotsVertical } from '@tabler/icons-react';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';

import { Avatar } from '@/src/components/avatar/avatar';
import { FollowButton } from '@/src/components/buttons/follow-button/follow-button';
import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
import { usePostHeader } from '@/src/components/post/post-header/use-post-header';
import { PostHeaderPlaceholder } from '@/src/components/post/post-header-placeholder/post-header-placeholder';
import { PostOptions } from '@/src/components/post/post-options/post-options';

import styles from './post-header.module.scss';

type Props = {
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
}: Props) => {
  const { isSignedIn, isLoading } = useAuth();
  const { handleDeletePost, isAuthor, username, confirmationModal, menuModal } =
    usePostHeader({
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
        <h2 className={styles.username}>{username}</h2>
      </Link>

      {isSignedIn && (
        <div className={styles.options}>
          {!isAuthor && <FollowButton userId={authorId} />}
          {isAuthor && (
            <button type="button" onClick={menuModal.openModal}>
              <span className="visually-hidden">Settings</span>
              <IconDotsVertical />
            </button>
          )}
        </div>
      )}

      <PostOptions
        isVisible={menuModal.isModalOpen}
        key="options"
        postId={postId}
        authorId={authorId}
        closeModal={menuModal.closeModal}
        openConfirmation={confirmationModal.openModal}
      />
      <ConfirmationAlert
        isVisible={confirmationModal.isModalOpen}
        key="confirmation"
        onConfirm={handleDeletePost}
        text="Do you want to delete post?"
        closeModal={confirmationModal.closeModal}
      />
    </Tag>
  );
};
