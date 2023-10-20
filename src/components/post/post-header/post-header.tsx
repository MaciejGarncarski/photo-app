'use client';

import { DotsThreeVertical, Trash } from '@phosphor-icons/react';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';

import { Avatar } from '@/src/components/avatar/avatar';
import { Button } from '@/src/components/buttons/button/button';
import { FollowButton } from '@/src/components/buttons/follow-button/follow-button';
import { Loader } from '@/src/components/loader/loader';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';
import { usePost } from '@/src/components/pages/account/use-post';
import { usePostHeader } from '@/src/components/post/post-header/use-post-header';
import { PostHeaderPlaceholder } from '@/src/components/post/post-header-placeholder/post-header-placeholder';
import { PostOptions } from '@/src/components/post/post-options/post-options';

import styles from './post-header.module.scss';

type Props = {
  tag?: 'header' | 'div';
  postId: number;
};

export const PostHeader = ({ tag: Tag = 'header', postId }: Props) => {
  const { isPending, sessionUser } = useAuth();

  const { data } = usePost({ postId });

  const {
    handleDeletePost,
    deletePostMutation,
    username,
    confirmationModal,
    menuModal,
    postData,
    dateFromNow,
  } = usePostHeader({
    authorId: data?.authorId,
    createdAt: data?.createdAt,
    postId,
  });

  const isAuthor = sessionUser?.id === data?.authorId || '';
  const authorId = data?.authorId;

  if (isPending || !authorId) {
    return <PostHeaderPlaceholder />;
  }

  return (
    <Tag className={styles.header}>
      <Link href={`/${username}`} className={styles.userAnchor}>
        <Avatar userId={authorId} size="small" />
        <span className={styles.username}>{username}</span>
      </Link>

      <p className={styles.createdAt}>
        <time dateTime={postData?.createdAt}>{dateFromNow}</time>
      </p>

      {sessionUser?.id && (
        <div className={styles.options}>
          {!isAuthor && <FollowButton userId={authorId} />}
          {isAuthor && (
            <button type="button" onClick={menuModal.openModal}>
              <span className="visually-hidden">Settings</span>
              <DotsThreeVertical size={28} />
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
      <ConfirmationDialog
        isVisible={confirmationModal.isModalOpen}
        text="Do you want to delete post?"
        closeModal={confirmationModal.closeModal}
      >
        <Button
          variant="destructive"
          onClick={handleDeletePost}
          disabled={deletePostMutation.isPending}
        >
          {deletePostMutation.isPending ? (
            <>
              Deleting
              <Loader color="primary" size="small" />
            </>
          ) : (
            <>
              Delete
              <Trash />
            </>
          )}
        </Button>
        <Button variant="secondary" onClick={confirmationModal.closeModal}>
          Cancel
        </Button>
      </ConfirmationDialog>
    </Tag>
  );
};
