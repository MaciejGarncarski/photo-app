import { IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useModal } from '@/src/hooks/useModal';

import { IconHeartWrapper } from '@/src/components/atoms/icons/IconHeartWrapper';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';

import { useComment } from '@/src/components/organisms/comment/useComment';
import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';

import { Comment as TComment } from '@/src/schemas/post-comment';

import styles from './Comment.module.scss';

type PropsTypes = {
  commentData: TComment;
};

export const Comment = ({ commentData }: PropsTypes) => {
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
        <VisuallyHidden>{`@${username}`}</VisuallyHidden>
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
          {isLiked ? <IconHeartWrapper isActive /> : <IconHeartWrapper />}
          <p className={clsx(isLiked && styles.isLiked)}>{likesCount}</p>
        </button>
        {isAbleToDelete && (
          <button type="button" onClick={openModal} className={clsx(styles.buttonLast, styles.likeBtn)}>
            <IconTrash />
            delete
          </button>
        )}
      </div>
      <ConfirmationAlert isVisible={isModalOpen} closeModal={closeModal} onConfirm={handleDelete} />
    </motion.article>
  );
};
