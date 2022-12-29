import { PostComments } from '@prisma/client';
import { motion } from 'framer-motion';
import moment from 'moment';

import styles from './comment.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { useAccount } from '@/components/pages/account/useAccount';

type CommentProps = {
  commentData: PostComments;
};

export const Comment = ({ commentData }: CommentProps) => {
  const { data } = useAccount({ id: commentData.user_id });

  const timeSinceCreated = moment(commentData.created_at).fromNow();

  return (
    <motion.div className={styles.comment}>
      <Avatar userID={commentData.user_id} className={styles.avatar} />
      <p>{data?.user.username}</p>
      <p>{commentData.comment_text}</p>
      <time dateTime={commentData.created_at.toString()}>{timeSinceCreated}</time>
    </motion.div>
  );
};
