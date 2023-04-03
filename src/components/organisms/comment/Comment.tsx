import { IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';
import { formatDate } from '@/src/utils/formatDate';

import { IconHeartWrapper } from '@/src/components/atoms/icons/IconHeartWrapper';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';

import { useCommentLike } from '@/src/components/organisms/comment/useCommentLike';
import { useDeleteComment } from '@/src/components/organisms/comment/useDeleteComment';
import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { PostComment } from '@/src/components/organisms/postComments/useInfiniteComments';

import styles from './comment.module.scss';

type PropsTypes = {
  commentData: PostComment;
};

export const Comment = ({ commentData }: PropsTypes) => {
  const { sessionUserData } = useAuth();
  const { openModal, closeModal, isModalOpen } = useModal();
  const { username } = useUser({ userId: commentData.userId });
  const { isLiked, id, commentText, createdAt, userId, likesCount } = commentData;
  const timeSinceCreated = formatDate(createdAt);

  const commentLike = useCommentLike({ commentId: id });
  const commentDelete = useDeleteComment();
  const handleLike = () => commentLike.mutate();
  const handleDelete = () => commentDelete.mutate({ commentId: id });

  const isAbleToDelete = sessionUserData?.id === userId || sessionUserData?.role === 'ADMIN';

  const userAccountHref = `/${username}`;

  return (
    <motion.article className={styles.comment}>
      <Link href={userAccountHref} className={styles.avatarContainer}>
        <VisuallyHidden>{`@${username}`}</VisuallyHidden>
        <Avatar userId={userId} size="small" />
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
