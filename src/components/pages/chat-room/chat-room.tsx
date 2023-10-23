'use client';

import { ArrowLeft, PaperPlaneTilt } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar } from '@/src/components/avatar/avatar';
import { Button } from '@/src/components/buttons/button/button';
import { ChatMessages } from '@/src/components/chat-messages/chat-messages';
import { Loader } from '@/src/components/loader/loader';
import { useChatRoom } from '@/src/components/pages/chat-room/use-chat-room';
import { TextArea } from '@/src/components/textarea/text-area';

import styles from './chat-room.module.scss';

export const ChatRoom = () => {
  const router = useRouter();

  const {
    isPending,
    isUserLoading,
    data,
    friendData,
    hasNextPage,
    onSubmit,
    form,
    ref,
  } = useChatRoom();

  if (isPending || isUserLoading || !data) {
    return <Loader color="accent" size="big" marginTop />;
  }

  const goBack = () => router.push('/chat');

  return (
    <section className={styles.chat}>
      <header className={styles.header}>
        <Button variant="primary" type="button" onClick={goBack}>
          <ArrowLeft />
        </Button>
        <Link href={`/${friendData?.username}`} className={styles.userHeader}>
          <Avatar userId={friendData?.id || ''} size="small" />
          <span className={styles.userInfo}>
            <span className={styles.name}>
              {friendData?.name && <span>{friendData?.name}</span>}
            </span>
            <span data-cy="chatroom username" className={styles.username}>
              @{friendData?.username}
            </span>
          </span>
        </Link>
      </header>

      <ChatMessages
        hasNextPage={hasNextPage}
        isPending={isPending}
        messagesData={data}
        ref={ref}
      />

      <form className={styles.form} onSubmit={onSubmit}>
        <TextArea
          label="Message"
          placeholder="Aa"
          rows={2}
          {...form.register('text')}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={
            !form.formState.isDirty || Boolean(form.formState.errors.text)
          }
        >
          Send
          <PaperPlaneTilt />
        </Button>
      </form>
    </section>
  );
};
