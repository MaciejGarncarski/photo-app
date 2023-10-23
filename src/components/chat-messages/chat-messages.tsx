import { InfiniteData } from '@tanstack/react-query';
import { forwardRef, Fragment } from 'react';

import { formatDateChat } from '@/src/utils/format-date-chat';

import { ChatMessage } from '@/src/components/chat-message/chat-message';
import { groupMessagesByUser } from '@/src/components/chat-messages/group-messages';
import { Loader } from '@/src/components/loader/loader';
import { ChatMessages as ChatMessagesType } from '@/src/schemas/chat.schema';

import styles from './chat-messages.module.scss';

type Props = {
  messagesData: InfiniteData<ChatMessagesType>;
  hasNextPage: boolean;
  isPending: boolean;
};

export const ChatMessages = forwardRef<HTMLLIElement, Props>(
  ({ hasNextPage, isPending, messagesData }, ref) => {
    const allMessages = messagesData.pages.flatMap((el) => el.messages);

    if (messagesData.pages[0].messagesCount === 0) {
      return (
        <div className={styles.messages}>
          <p className={styles.noMessages}>No messages yet.</p>
        </div>
      );
    }

    const groupedMessages = groupMessagesByUser(allMessages);

    return (
      <ul className={styles.messages}>
        {groupedMessages.map((group) => {
          return (
            <Fragment key={group[0].id}>
              <ChatMessage messageGroup={group} />
              {group[0].shouldShowTime && (
                <li className={styles.time}>
                  <time dateTime={group[0].createdAt}>
                    {formatDateChat(group[0].createdAt)}
                  </time>
                </li>
              )}
            </Fragment>
          );
        })}

        {hasNextPage && !isPending && (
          <li className={styles.loading} ref={ref}>
            <Loader color="accent" size="big" />
          </li>
        )}
      </ul>
    );
  },
);
