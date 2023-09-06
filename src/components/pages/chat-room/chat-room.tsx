'use client';

import { ArrowLeft, PaperPlaneTilt } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { checkTimeBetweenMessages } from '@/src/utils/check-time-between-messages';

import { Avatar } from '@/src/components/avatar/avatar';
import { Button } from '@/src/components/buttons/button/button';
import { ChatMessage } from '@/src/components/chat-message/chat-message';
import { Input } from '@/src/components/input/input';
import { Loader } from '@/src/components/loader/loader';
import { useChatRoom } from '@/src/components/pages/chat-room/use-chat-room';

import styles from './chat-room.module.scss';

export const ChatRoom = () => {
  const router = useRouter();

  const {
    isLoading,
    isUserLoading,
    data,
    friendId,
    friendData,
    hasNextPage,
    inputVal,
    onSubmit,
    onChange,
    ref,
  } = useChatRoom();

  if (isLoading || isUserLoading || !data) {
    return <Loader color="accent" size="big" marginTop />;
  }

  const goBack = () => router.push('/chat');

  return (
    <section className={styles.chat}>
      <header className={styles.header}>
        <Button variant="primary" type="button" onClick={goBack}>
          <ArrowLeft />
          <span className={styles.goBack}>Go back</span>
        </Button>
        <Link href={`/${friendData?.username}`} className={styles.userHeader}>
          <Avatar userId={friendId || ''} size="small" />
          <p className={styles.headerHeading}>
            {friendData?.name && <span>{friendData?.name}</span>}
            &nbsp;
            <span data-cy="chatroom username">@{friendData?.username}</span>
          </p>
        </Link>
      </header>

      <ul className={styles.messages}>
        {data.pages[0].messagesCount === 0 && (
          <li className={styles.noMessages}>
            <p>No messages yet.</p>
          </li>
        )}

        {data.pages.map((page) => {
          return page.messages.map((message, index, messages) => {
            const prevMessage = messages[index - 1];

            if (!prevMessage) {
              return <ChatMessage message={message} key={message.id} />;
            }

            const shouldShowTime = checkTimeBetweenMessages(
              message.createdAt,
              prevMessage.createdAt,
            );
            const formattedDate = new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }).format(message.createdAt);

            if (shouldShowTime) {
              return (
                <>
                  <ChatMessage message={message} key={message.id} />
                  <p className={styles.time}>
                    <time dateTime={message.createdAt.toDateString()}>
                      {formattedDate}
                    </time>
                  </p>
                </>
              );
            }

            return <ChatMessage message={message} key={message.id} />;
          });
        })}
        {hasNextPage && !isLoading && (
          <li className={styles.loading} ref={ref}>
            <Loader color="accent" size="small" />
          </li>
        )}
      </ul>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="text"
          labelText="Message"
          placeholder="Aa"
          value={inputVal}
          onChange={onChange}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={inputVal.trim() === ''}
        >
          Send
          <PaperPlaneTilt />
        </Button>
      </form>
    </section>
  );
};
