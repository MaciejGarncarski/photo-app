import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useState } from 'react';

import styles from './comment.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Icon } from '@/components/atoms/icons/Icons';
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

dayjs.extend(relativeTime);

export const Comment = ({ commentData }: CommentProps) => {
  const { sessionUserData } = useAuth();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { data } = useAccount({ userId: commentData.user_id });
  const { isLiked, id, created_at, comment_text, user_id, likesCount } = commentData;
  const timeSinceCreated = dayjs(created_at).fromNow();
  const formattedDate = dayjs(created_at).format('MMMM DD YYYY');

  const commentLike = useCommentLike({ commentId: id });
  const commentDelete = useDeleteComment();

  const handleLike = () => commentLike.mutate();
  const handleDelete = () => commentDelete.mutate({ commentId: id });
  const onDeleteBtnClick = () => setIsDeleting(true);

  const isAbleToDelete = sessionUserData?.user.id === user_id || sessionUserData?.user.role === 'ADMIN';

  const commentWithNewLine = comment_text.replace(/\r?\n/g, '<br />');

  const userAccountHref = `/${sessionUserData?.user.username}`;

  return (
    <motion.article className={styles.comment}>
      <Link href={userAccountHref}>
        <Avatar userId={user_id} className={styles.avatar} width={POST_AVATAR_SIZE} height={POST_AVATAR_SIZE} />
      </Link>
      <div className={styles.commentText}>
        <Link href={userAccountHref}>
          <h3 className={styles.author}>{data?.user.username}</h3>
        </Link>
        <p className={styles.content}>{parse(commentWithNewLine)}</p>
      </div>

      <div className={styles.info}>
        <p className={styles.createdAt}>
          <time dateTime={created_at.toString()}>{timeSinceCreated}</time>
        </p>
        <button type="button" onClick={handleLike} className={styles.likeBtn}>
          {isLiked ? <Icon.HeartActive /> : <Icon.Heart />}
          <p className={clsx(isLiked && styles.isLiked)}>{likesCount}</p>
        </button>
        {isAbleToDelete && (
          <button type="button" onClick={onDeleteBtnClick} className={styles.likeBtn}>
            delete
          </button>
        )}
      </div>

      {isDeleting && (
        <ConfirmationModal
          confirmText="Delete"
          onCancel={() => setIsDeleting(false)}
          onConfirm={handleDelete}
          setIsOpen={setIsDeleting}
        />
      )}
    </motion.article>
  );
};
