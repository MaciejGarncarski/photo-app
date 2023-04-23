import { IconArrowLeft, IconSend } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { useUser } from '@/src/hooks/useUser';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { ChatMessage } from '@/src/components/atoms/chatMessage/ChatMessage';
import { Heading } from '@/src/components/atoms/heading/Heading';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { Loader } from '@/src/components/molecules/loader/Loader';

import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import { useChatRoom } from '@/src/components/pages/chatRoom/useChatRoom';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

import styles from './ChatRoom.module.scss';

export const ChatRoom = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data, isLoading, infiniteRef, inputVal, onChange, onSubmit, hasNextPage, friendId } = useChatRoom();
  const { data: friendData } = useUser({ userId: friendId || '' });

  useEffect(() => {
    if (bottomRef.current && !isLoading) {
      bottomRef.current.scrollIntoView();
    }
  }, [isLoading]);

  if (isLoading || !data) {
    return <TextWithLoader text="Connecting to chat" />;
  }

  return (
    <ProtectedPage shouldBeSignedIn>
      <section className={styles.chat}>
        <header className={styles.header}>
          <Button variant="primary" type="button" onClick={() => router.push('/chat')}>
            <IconArrowLeft />
            <span className={styles.goBack}>Go back</span>
          </Button>
          <Link href={`/${friendData?.username}`} className={styles.userHeader}>
            <Avatar userId={friendId || ''} size="small" />
            <Heading tag="h2" size="small">
              {friendData?.name && `${friendData?.name},`} @{friendData?.username}
            </Heading>
          </Link>
        </header>

        <ul className={styles.messages}>
          {data.pages[0].messagesCount === 0 && (
            <li className={styles.noMessages}>
              <p>No messages yet.</p>
            </li>
          )}

          {data.pages.map((page) => {
            return page.messages.map((message) => {
              return <ChatMessage message={message} key={message.id} />;
            });
          })}
          {(isLoading || hasNextPage) && (
            <li ref={infiniteRef} className={styles.loading}>
              <Loader color="blue" size="normal" />;
            </li>
          )}
        </ul>
        <div ref={bottomRef} />
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Write something.."
              className={styles.input}
              value={inputVal}
              onChange={onChange}
            />
            <button type="submit" className={styles.button} disabled={inputVal.trim() === ''}>
              <IconSend />
              <VisuallyHidden>Send message</VisuallyHidden>
            </button>
          </form>
        </div>
      </section>
    </ProtectedPage>
  );
};