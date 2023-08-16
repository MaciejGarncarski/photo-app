'use client';

import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { Avatar } from '@/src/components/avatar/avatar';
import { linkVariants } from '@/src/components/chat-users-list/chat-users-list.animation';
import { FetchErrorMessage } from '@/src/components/fetch-error-message/fetch-error-message';
import { containerVariants } from '@/src/components/images-preview/images-preview.animation';
import { Loader } from '@/src/components/loader/loader';
import { ChatUsersResponse } from '@/src/schemas/chat';

import styles from './chat-users-list.module.scss';

type Props = {
  chatUsers: UseInfiniteQueryResult<InfiniteData<ChatUsersResponse>>;
  isEnabled: boolean;
};

const MotionLink = motion(Link);

export const ChatUsersList = ({ chatUsers, isEnabled }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isError } = chatUsers;
  const params = useParams();

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: isEnabled,
  });

  if (isError || !data) {
    return <FetchErrorMessage message="Cannot fetch users." />;
  }

  if (data?.pages[0].usersCount === 0) {
    return <p>no users found</p>;
  }

  return (
    <nav className={styles.nav}>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={styles.list}
      >
        {data.pages.map((page) => {
          return page.users.map(({ id, name, username }) => {
            const isActive = id === (params?.receiverId as string);
            return (
              <li key={id} data-cy="chat user">
                <MotionLink
                  variants={linkVariants}
                  href={`/chat/${id}`}
                  className={clsx(isActive && styles.linkActive, styles.link)}
                >
                  <Avatar userId={id} size="medium" />
                  <span className={styles.name}>
                    <span className={styles.fullName}>{name}</span>
                    <span className={styles.username}>@{username}</span>
                  </span>
                </MotionLink>
              </li>
            );
          });
        })}
        {hasNextPage && !isLoading && (
          <div ref={ref} className={styles.loading}>
            <Loader color="blue" size="normal" />
          </div>
        )}
      </motion.ul>
    </nav>
  );
};
