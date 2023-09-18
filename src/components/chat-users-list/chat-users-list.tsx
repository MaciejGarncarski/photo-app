'use client';

import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { ChatUser } from '@/src/components/chat-users-list/chat-user';
import { FetchErrorMessage } from '@/src/components/fetch-error-message/fetch-error-message';
import { containerVariants } from '@/src/components/images-preview/images-preview.animation';
import { Loader } from '@/src/components/loader/loader';
import { ChatUsersResponse } from '@/src/schemas/chat';

import styles from './chat-users-list.module.scss';

type Props = {
  chatUsers: UseInfiniteQueryResult<InfiniteData<ChatUsersResponse>>;
  isEnabled: boolean;
};

export const ChatUsersList = ({ chatUsers, isEnabled }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isError } = chatUsers;

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: isEnabled,
  });

  if (!data || isLoading) {
    return <Loader color="accent" size="big" marginTop />;
  }

  if (isError) {
    return <FetchErrorMessage message="Cannot fetch users." />;
  }

  if (data?.pages[0].usersCount === 0) {
    return <p className={styles.notFound}>No other users found.</p>;
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
          return page.users.map((userId) => {
            return <ChatUser userId={userId} key={userId} />;
          });
        })}
        {hasNextPage && !isLoading && (
          <div ref={ref} className={styles.loading}>
            <Loader color="accent" size="small" />
          </div>
        )}
      </motion.ul>
    </nav>
  );
};
