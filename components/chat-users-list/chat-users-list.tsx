'use client';

import { Fragment } from 'react';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

import { ChatUser } from '@/components/chat-users-list/chat-user';
import { FetchErrorMessage } from '@/components/fetch-error-message/fetch-error-message';
import { Loader } from '@/components/loader/loader';
import { useChatUsers } from '@/components/pages/chat/use-chat-users';

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
    <ul className={styles.list}>
      {data.pages.map((page) => {
        return page.users.map(({ userId, message, messageCreatedAt }, idx) => {
          return (
            <Fragment key={userId}>
              <ChatUser
                userId={userId}
                message={message}
                messageCreatedAt={messageCreatedAt}
              />
              {page.users.length - 1 !== idx && (
                <li>
                  <hr className={styles.separator} />
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
    </ul>
  );
};
