'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useUser } from '@/src/hooks/use-user';
import { formatDateRelative } from '@/src/utils/format-date-relative';

import { Avatar } from '@/src/components/avatar/avatar';
import { linkVariants } from '@/src/components/chat-users-list/chat-users-list.animation';

import styles from './chat-users-list.module.scss';

type Props = {
  userId: string;
  message: string;
  messageCreatedAt: string | null;
};

const MotionLink = motion(Link);

export const ChatUser = ({ userId, message, messageCreatedAt }: Props) => {
  const { data, isPending, isSuccess } = useUser({ userId });
  const params = useParams();

  const isActive = userId === (params?.receiverId as string);

  if (isPending || !isSuccess) {
    return (
      <li className={styles.listItem}>
        <div className={styles.placeholderLoading}></div>
      </li>
    );
  }

  return (
    <li className={styles.listItem}>
      <MotionLink
        variants={linkVariants}
        href={`/chat/${userId}`}
        className={clsx(isActive && styles.linkActive, styles.link)}
      >
        <Avatar userId={userId} size="medium" />
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
    </li>
  );
};
