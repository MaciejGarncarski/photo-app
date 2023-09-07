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
};

const MotionLink = motion(Link);

export const ChatUser = ({ userId }: Props) => {
  const { data, isLoading } = useUser({ userId });
  const params = useParams();

  if (!data || isLoading) {
    return <Loader color="accent" size="small" />;
  }

  const isActive = userId === (params?.receiverId as string);

  return (
    <li key={userId} data-cy="chat user" className={styles.listItem}>
      {!data || isLoading ? <Loader color="accent" size="small" /> : null}
      <MotionLink
        variants={linkVariants}
        href={`/chat/${userId}`}
        className={clsx(isActive && styles.linkActive, styles.link)}
      >
        <Avatar userId={userId} size="small" />
        <span className={styles.name}>
          <span className={styles.fullName}>{data.name}</span>
          <span className={styles.username}>@{data.username}</span>
        </span>
      </MotionLink>
    </li>
  );
};
