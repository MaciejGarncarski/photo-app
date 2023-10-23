'use client';

import { motion } from 'framer-motion';
import { Fragment } from 'react';

import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { ChatUser } from '@/src/components/chat-users-list/chat-user';
import { FetchErrorMessage } from '@/src/components/fetch-error-message/fetch-error-message';
import { containerVariants } from '@/src/components/images-preview/images-preview.animation';
import { Loader } from '@/src/components/loader/loader';
import { useChatUsers } from '@/src/components/pages/chat/use-chat-users';

import styles from './chat-users-list.module.scss';

export const ChatUsersList = () => {
  const { data, hasNextPage, fetchNextPage, isPending, isError } =
    useChatUsers();

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  if (!data || isPending) {
    return <Loader color="accent" size="big" marginTop />;
  }

  if (isError) {
    return <FetchErrorMessage message="Cannot fetch users." />;
  }

  if (data?.pages[0].usersCount === 0) {
    return <p className={styles.notFound}>No other users found.</p>;
  }

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={styles.list}
    >
      {data.pages.map((page) => {
        return page.users.map(({ id, message, messageCreatedAt }, idx) => {
          return (
            <Fragment key={id}>
              <ChatUser
                userId={id}
                message={message}
                messageCreatedAt={messageCreatedAt}
              />
              {page.users.length - 1 !== idx && (
                <li>
                  <hr className={styles.separator}></hr>
                </li>
              )}
            </Fragment>
          );
        });
      })}
      {hasNextPage && !isPending && (
        <div ref={ref} className={styles.loading}>
          <Loader color="accent" size="small" />
        </div>
      )}
    </motion.ul>
  );
};
