import { InfiniteData } from '@tanstack/react-query';
import { forwardRef, Fragment } from 'react';

import { checkTimeBetweenMessages } from '@/src/utils/check-time-between-messages';
import { formatDateChat } from '@/src/utils/format-date-chat';

import { ChatMessage } from '@/src/components/chat-message/chat-message';
import { groupMessagesByUser } from '@/src/components/chat-messages/group-messages';
import { Loader } from '@/src/components/loader/loader';
import { ChatMessagesResponse } from '@/src/schemas/chat';

import styles from './chat-messages.module.scss';

type Props = {
  messagesData: InfiniteData<ChatMessagesResponse>;
  hasNextPage: boolean;
  isLoading: boolean;
};

export const ChatMessages = forwardRef<HTMLLIElement, Props>(
  ({ hasNextPage, isLoading, messagesData }, ref) => {
    return (
      <ul className={styles.messages}>
        {messagesData.pages[0].messagesCount === 0 && (
          <li className={styles.noMessages}>
            <p>No messages yet.</p>
          </li>
        )}

        {messagesData.pages.map((page) => {
          const groupedMessages = groupMessagesByUser(page.messages);

          return groupedMessages.map((messageGroup, index, messagesArray) => {
            if (!messagesArray[index - 1]) {
              return (
                <ChatMessage
                  messageGroup={messageGroup}
                  key={messageGroup[0].id}
                />
              );
            }

            const currentMessage = messagesArray[index][0];
            const prevMessage = messagesArray[index - 1][0];

            const shouldShowTime = checkTimeBetweenMessages(
              currentMessage.createdAt,
              prevMessage.createdAt,
            );

            if (shouldShowTime) {
              const formattedDate = formatDateChat(currentMessage.createdAt);

              return (
                <Fragment key={messageGroup[0].id}>
                  <ChatMessage messageGroup={messageGroup} />
                  <p className={styles.time}>
                    <time dateTime={currentMessage.createdAt.toDateString()}>
                      {formattedDate}
                    </time>
                  </p>
                </Fragment>
              );
            }

            return (
              <ChatMessage
                messageGroup={messageGroup}
                key={messageGroup[0].id}
              />
            );
          });
        })}

        {hasNextPage && !isLoading && (
          <li className={styles.loading} ref={ref}>
            <Loader color="accent" size="big" />
          </li>
        )}
      </ul>
    );
  },
);
