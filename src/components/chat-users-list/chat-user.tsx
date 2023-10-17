'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useUser } from '@/src/hooks/use-user';

import { Avatar } from '@/src/components/avatar/avatar';
import { linkVariants } from '@/src/components/chat-users-list/chat-users-list.animation';
import { Loader } from '@/src/components/loader/loader';

import styles from './chat-users-list.module.scss';

type Props = {
  userId: string;
  message: string | null;
};

const MotionLink = motion(Link);

export const ChatUser = ({ userId, message }: Props) => {
  const { data, isLoading } = useUser({ userId });
  const params = useParams();

  const isActive = userId === (params?.receiverId as string);

  return (
    <li className={styles.listItem}>
      {!data || isLoading ? (
        <span className={clsx(styles.loading, styles.link)}>
          <Loader color="accent" size="small" />
        </span>
      ) : (
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
        </MotionLink>
      )}
    </li>
  );
};
