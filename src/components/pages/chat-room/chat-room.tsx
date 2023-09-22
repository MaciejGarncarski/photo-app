'use client';

import { ArrowLeft, PaperPlaneTilt } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar } from '@/src/components/avatar/avatar';
import { Button } from '@/src/components/buttons/button/button';
import { ChatMessages } from '@/src/components/chat-messages/chat-messages';
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
      <ChatMessages
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        messagesData={data}
        ref={ref}
      />

      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="text"
          labelText="Message"
          placeholder="Aa"
          variant="primary"
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
