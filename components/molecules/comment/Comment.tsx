import clsx from 'clsx';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useState } from 'react';

import styles from './comment.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Icon } from '@/components/atoms/icons/Icons';
import { useCommentLike } from '@/components/molecules/comment/useCommentLike';
import { useDeleteComment } from '@/components/molecules/comment/useDeleteComment';
import { ConfirmationModal } from '@/components/molecules/confirmationModal/ConfirmationModal';
import { PostCommentsWithIsLiked } from '@/components/organisms/postModal/useInfiniteComments';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

type CommentProps = {
  commentData: PostCommentsWithIsLiked;
};

export const Comment = ({ commentData }: CommentProps) => {
  const { sessionUserData } = useAuth();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { data } = useAccount({ id: commentData.user_id });
  const { isLiked, id, created_at, comment_text, user_id, likesCount } = commentData;
  const timeSinceCreated = dayjs(created_at).fromNow();

  const commentLike = useCommentLike({ id });
  const commentDelete = useDeleteComment();

  return (
    <motion.div className={styles.comment}>
      <Avatar userID={user_id} className={styles.avatar} />
      <p className={styles.commentText}>
        <span className={styles.author}>{data?.user.username}</span>
        &nbsp;
        <span>{comment_text}</span>
      </p>
      <div className={styles.info}>
        <p className={styles.createdAt}>
          <time dateTime={created_at.toString()}>{timeSinceCreated}</time>
        </p>
        <button type='button' onClick={() => commentLike.mutate()} className={styles.likeBtn}>
          {isLiked ? <Icon.HeartActive /> : <Icon.Heart />}
          <p className={clsx(isLiked && styles.isLiked)}>{likesCount}</p>
        </button>

        {(sessionUserData?.user.id === user_id || sessionUserData?.user.role === 'ADMIN') && (
          <button type='button' onClick={() => setIsDeleting(true)} className={styles.likeBtn}>
            delete
          </button>
        )}
      </div>

      {isDeleting && (
        <ConfirmationModal
          onCancel={() => setIsDeleting(false)}
          onConfirm={() => commentDelete.mutate({ id })}
          setIsOpen={setIsDeleting}
        />
      )}
    </motion.div>
  );
};
