import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { m } from 'framer-motion';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { IconHeartWrapper } from '@/components/atoms/icons/IconHeartWrapper';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useCommentLike } from '@/components/molecules/comment/useCommentLike';
import { useDeleteComment } from '@/components/molecules/comment/useDeleteComment';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { POST_AVATAR_SIZE } from '@/components/molecules/postHeader/PostHeader';
import { PostCommentsWithIsLiked } from '@/components/organisms/postModal/useInfiniteComments';

import styles from './comment.module.scss';

type CommentProps = {
  commentData: PostCommentsWithIsLiked;
};

dayjs.extend(relativeTime);

export const Comment = ({ commentData }: CommentProps) => {
  const { sessionUserData } = useAuth();
  const { open, close, modalOpen } = useModal();
  const { username } = useUser({ userId: commentData.user_id });
  const { isLiked, id, created_at, comment_text, user_id, likesCount } = commentData;
  const timeSinceCreated = dayjs(created_at).fromNow();

  const commentLike = useCommentLike({ commentId: id });
  const commentDelete = useDeleteComment();

  const handleLike = () => commentLike.mutate();
  const handleDelete = () => commentDelete.mutate({ commentId: id });

  const isAbleToDelete = sessionUserData?.id === user_id || sessionUserData?.role === 'ADMIN';

  const userAccountHref = `/${username}`;

  return (
    <m.article className={styles.comment}>
      <Link href={userAccountHref} className={styles.avatarContainer}>
        <VisuallyHiddenText text={`@${username}`} />
        <Avatar userId={user_id} className={styles.avatar} width={POST_AVATAR_SIZE} height={POST_AVATAR_SIZE} />
      </Link>
      <div className={styles.commentText}>
        <h3 className={styles.author}>{username}</h3>
        <p className={styles.content}>{comment_text}</p>
      </div>

      <div className={styles.info}>
        <p className={styles.createdAt}>
          <time dateTime={created_at.toString()}>{timeSinceCreated}</time>
        </p>
        <button type="button" onClick={handleLike} className={styles.likeBtn}>
          {isLiked ? <IconHeartWrapper isActive /> : <IconHeartWrapper />}
          <p className={clsx(isLiked && styles.isLiked)}>{likesCount}</p>
        </button>
        {isAbleToDelete && (
          <button type="button" onClick={open} className={styles.likeBtn}>
            delete
          </button>
        )}
      </div>

      <ModalContainer>{modalOpen && <ConfirmationAlert close={close} onConfirm={handleDelete} />}</ModalContainer>
    </m.article>
  );
};
