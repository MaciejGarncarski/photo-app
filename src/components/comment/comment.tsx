import { Heart, Trash } from '@phosphor-icons/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useModal } from '@/src/hooks/use-modal';

import { Avatar } from '@/src/components/avatar/avatar';
import { Button } from '@/src/components/buttons/button/button';
import { useComment } from '@/src/components/comment/use-comment';
import { ConfirmationDialog } from '@/src/components/modals/confirmation-dialog/confirmation-dialog';
import { Comment as TComment } from '@/src/schemas/post-comment';

import styles from './comment.module.scss';

type Props = {
  commentData: TComment;
};

export const Comment = ({ commentData }: Props) => {
  const { authorId, createdAt } = commentData;
  const { openModal, closeModal, isModalOpen } = useModal();

  const {
    text,
    handleDelete,
    handleLike,
    isAbleToDelete,
    isLiked,
    likesCount,
    timeSinceCreated,
    userAccountHref,
    username,
  } = useComment({ commentData });

  return (
    <motion.article className={styles.comment}>
      <Link href={userAccountHref} className={styles.avatarContainer}>
        <span className="visually-hidden">@{username}</span>
        <Avatar userId={authorId} size="xs" />
      </Link>
      <div className={styles.commentText}>
        <h3 className={styles.author}>{username}</h3>
        <p className={styles.content}>{text}</p>
      </div>
      <div className={styles.info}>
        <button type="button" onClick={handleLike} className={styles.likeBtn}>
          <Heart />
          <p className={clsx(isLiked && styles.isLiked)}>{likesCount}</p>
        </button>

        <p className={styles.createdAt}>
          <time dateTime={createdAt.toString()}>{timeSinceCreated}</time>
        </p>

        {isAbleToDelete && (
          <div className={styles.buttonLast}>
            <Button type="button" variant="destructive" onClick={openModal}>
              <Trash />
              Delete
            </Button>
          </div>
        )}
      </div>

      <ConfirmationDialog
        isVisible={isModalOpen}
        closeModal={closeModal}
        text="Do you want to delete comment?"
      >
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ConfirmationDialog>
    </motion.article>
  );
};
