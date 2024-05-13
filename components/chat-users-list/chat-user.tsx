'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useUser } from '@/hooks/use-user';
import { formatDateRelative } from '@/utils/format-date-relative';

import { Avatar } from '@/components/avatar/avatar';
import { linkVariants } from '@/components/chat-users-list/chat-users-list.animation';

import styles from './chat-users-list.module.scss';

type Props = {
  userId: string;
  message: string;
  messageCreatedAt: string | null;
};

const MotionLink = motion(Link);

export const ChatUser = ({ userId, message, messageCreatedAt }: Props) => {
  const { data, isPending } = useUser({ userId });
  const params = useParams();

  const isActive = userId === (params?.receiverId as string);

  return (
    <AnimatePresence mode="wait">
      {isPending || !data ? (
        <motion.li
          key={`placeholder-${userId}`}
          className={styles.listItem}
          exit={{ opacity: 0 }}
        >
          <div className={styles.placeholderLoading}></div>
        </motion.li>
      ) : (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.listItem}
        >
          <MotionLink
            variants={linkVariants}
            href={`/chat/${data.username}`}
            className={clsx(isActive && styles.linkActive, styles.link)}
          >
            <Avatar userId={userId} size="small" />
            <span className={styles.rightCol}>
              <span className={styles.username}>@{data.username}</span>
              <span className={styles.message}>
                {message || 'No messages yet.'}
              </span>
            </span>
            {messageCreatedAt && (
              <span className={styles.createdAt}>
                <time dateTime={messageCreatedAt}>
                  {formatDateRelative(messageCreatedAt)}
                </time>
              </span>
            )}
          </MotionLink>
        </motion.li>
      )}
    </AnimatePresence>
  );
};
