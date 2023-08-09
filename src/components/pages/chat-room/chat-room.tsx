import { IconArrowLeft, IconSend } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { ChatMessage } from '@/src/components/atoms/chatMessage/ChatMessage';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { Loader } from '@/src/components/molecules/loader/Loader';

import { TextWithLoader } from '@/src/components/organisms/textWithLoader/TextWithLoader';

import { useChatRoom } from '@/src/components/pages/chatRoom/useChatRoom';

import styles from './ChatRoom.module.scss';

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
    infiniteRef,
  } = useChatRoom();

  if (isLoading || isUserLoading || !data) {
    return <TextWithLoader text="Connecting to chat" />;
  }

  const goBack = () => router.push('/chat');

  return (
    <section className={styles.chat}>
      <header className={styles.header}>
        <Button variant="primary" type="button" onClick={goBack}>
          <IconArrowLeft />
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
          return page.messages.map((message) => {
            return <ChatMessage message={message} key={message.id} />;
          });
        })}
        {(isLoading || hasNextPage) && (
          <li ref={infiniteRef} className={styles.loading}>
            <Loader color="blue" size="normal" />
          </li>
        )}
      </ul>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Write something.."
            className={styles.input}
            value={inputVal}
            onChange={onChange}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={inputVal.trim() === ''}
          >
            <IconSend />
            <VisuallyHidden>Send message</VisuallyHidden>
          </button>
        </form>
      </div>
    </section>
  );
};
