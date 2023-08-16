import { IconHeart, IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useModal } from '@/src/hooks/use-modal';

import { Avatar } from '@/src/components/avatar/avatar';
import { useComment } from '@/src/components/comment/use-comment';
import { ConfirmationAlert } from '@/src/components/modals/confirmation-alert/confirmation-alert';
import { Comment as TComment } from '@/src/schemas/post-comment';

import styles from './comment.module.scss';

type Props = {
  commentData: TComment;
};

export const Comment = ({ commentData }: Props) => {
  const { authorId, createdAt } = commentData;
  const { openModal, closeModal, isModalOpen } = useModal();

  const {
    commentText,
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
        <Avatar userId={authorId} size="small" />
      </Link>
      <div className={styles.commentText}>
        <h3 className={styles.author}>{username}</h3>
        <p className={styles.content}>{commentText}</p>
      </div>

      <div className={styles.info}>
        <p className={styles.createdAt}>
          <time dateTime={createdAt.toString()}>{timeSinceCreated}</time>
        </p>
        <button type="button" onClick={handleLike} className={styles.likeBtn}>
          <IconHeart />
          <p className={clsx(isLiked && styles.isLiked)}>{likesCount}</p>
        </button>
        {isAbleToDelete && (
          <button
            type="button"
            onClick={openModal}
            className={clsx(styles.buttonLast, styles.likeBtn)}
          >
            <IconTrash />
            delete
          </button>
        )}
      </div>
      <ConfirmationAlert
        isVisible={isModalOpen}
        closeModal={closeModal}
        onConfirm={handleDelete}
      />
    </motion.article>
  );
};
