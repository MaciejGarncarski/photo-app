import { PostComments } from '@prisma/client';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

import styles from './comment.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { useAccount } from '@/components/pages/account/useAccount';

type CommentProps = {
  commentData: PostComments;
};

export const Comment = ({ commentData }: CommentProps) => {
  const { data } = useAccount({ id: commentData.user_id });

  const timeSinceCreated = dayjs().to(dayjs(commentData.created_at));

  return (
    <motion.div className={styles.comment}>
      <Avatar userID={commentData.user_id} className={styles.avatar} />
      <p>{data?.user.username}</p>
      <p>{commentData.comment_text}</p>
      <time dateTime={commentData.created_at.toString()}>{timeSinceCreated}</time>
    </motion.div>
  );
};
