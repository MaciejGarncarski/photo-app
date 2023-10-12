import { InfiniteData } from '@tanstack/react-query';
import { forwardRef, Fragment } from 'react';

import { checkTimeBetweenMessages } from '@/src/utils/check-time-between-messages';
import { formatDateChat } from '@/src/utils/format-date-chat';

import { ChatMessage } from '@/src/components/chat-message/chat-message';
import { groupMessagesByUser } from '@/src/components/chat-messages/group-messages';
import { Loader } from '@/src/components/loader/loader';
import { ChatMessages as ChatMessagesType } from '@/src/schemas/chat';

import styles from './chat-messages.module.scss';

type Props = {
  messagesData: InfiniteData<ChatMessagesType>;
  hasNextPage: boolean;
  isLoading: boolean;
};

export const ChatMessages = forwardRef<HTMLLIElement, Props>(
  ({ hasNextPage, isLoading, messagesData }, ref) => {
    if (messagesData.pages[0].messagesCount === 0) {
      return (
        <div className={styles.messages}>
          <p className={styles.noMessages}>No messages yet.</p>
        </div>
      );
    }

    return (
      <ul className={styles.messages}>
        {messagesData.pages.map((page) => {
          const firstMessage = messagesData.pages[0].messages[0];

          const timeFromFirstMessage = checkTimeBetweenMessages(
            firstMessage.createdAt,
            new Date(),
          );
          const formattedDate = formatDateChat(firstMessage.createdAt);
          const groupedMessages = groupMessagesByUser(page.messages);

          return groupedMessages.map((messageGroup, index, messagesArray) => {
            if (index === 0) {
              return (
                <Fragment key={messageGroup[0].id}>
                  <ChatMessage messageGroup={messageGroup} />

                  {timeFromFirstMessage && (
                    <p className={styles.time}>
                      <time dateTime={firstMessage.createdAt}>
                        {formattedDate}
                      </time>
                    </p>
                  )}
                </Fragment>
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
                    <time dateTime={currentMessage.createdAt}>
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
