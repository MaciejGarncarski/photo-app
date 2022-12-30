import clsx from 'clsx';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import styles from './comment.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Icon } from '@/components/atoms/icons/Icons';
import { Loading } from '@/components/atoms/loading/Loading';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { useCommentLike } from '@/components/molecules/comment/useCommentLike';
import { useDeleteComment } from '@/components/molecules/comment/useDeleteComment';
import { ConfirmationModal } from '@/components/molecules/confirmationModal/ConfirmationModal';
import { POST_AVATAR_SIZE } from '@/components/molecules/postHeader/PostHeader';
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
  const formattedDate = dayjs(created_at).format('MMMM DD YYYY');

  const commentLike = useCommentLike({ commentId: id });
  const commentDelete = useDeleteComment();

  const handleLike = () => commentLike.mutate();
  const handleDelete = () => commentDelete.mutate({ commentId: id });
  const onDeleteBtnClick = () => setIsDeleting(true);

  if (!sessionUserData?.user) {
    return <Loading variants={['small']} />;
  }

  const { user } = sessionUserData;
  const isAbleToDelete = user.id === user_id || user.role === 'ADMIN';

  return (
    <motion.article className={styles.comment}>
      <Link href={`/${user.username}`}>
        <Avatar
          userId={user_id}
          className={styles.avatar}
          width={POST_AVATAR_SIZE}
          height={POST_AVATAR_SIZE}
        />
      </Link>
      <div className={styles.commentText}>
        <Link href={`/${user.username}`}>
          <h3 className={styles.author}>{data?.user.username}</h3>
        </Link>
        <p className={styles.content}>{comment_text}</p>
      </div>

      <div className={styles.info}>
        <Tooltip variant='right' content={formattedDate}>
          <p className={styles.createdAt}>
            <time dateTime={created_at.toString()}>{timeSinceCreated}</time>
          </p>
        </Tooltip>
        <button type='button' onClick={handleLike} className={styles.likeBtn}>
          {isLiked ? <Icon.HeartActive /> : <Icon.Heart />}
          <p className={clsx(isLiked && styles.isLiked)}>{likesCount}</p>
        </button>
        {isAbleToDelete && (
          <button type='button' onClick={onDeleteBtnClick} className={styles.likeBtn}>
            delete
          </button>
        )}
      </div>

      {isDeleting && (
        <ConfirmationModal
          onCancel={() => setIsDeleting(false)}
          onConfirm={handleDelete}
          setIsOpen={setIsDeleting}
        />
      )}
    </motion.article>
  );
};
