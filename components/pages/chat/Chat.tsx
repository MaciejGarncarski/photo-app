import { ChatRoom } from '@prisma/client';
import { IconArrowLeft, IconLoader2, IconSend } from '@tabler/icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useUser } from '@/hooks/useUser';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Button } from '@/components/atoms/button/Button';
import { ChatMessage } from '@/components/atoms/chatMessage/ChatMessage';
import { Heading } from '@/components/atoms/heading/Heading';
import { LoadingHeading } from '@/components/atoms/loadingHeading/LoadingHeading';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useChat } from '@/components/pages/chat/useChat';

import styles from './chat.module.scss';

type PropsTypes = {
  chatRoomData: ChatRoom;
};

export const Chat = ({ chatRoomData }: PropsTypes) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { session } = useAuth();
  const { isMobile } = useScreenWidth();
  const { isGoingUp } = useScrollPosition();

  const { userOne_id, userTwo_id } = chatRoomData;
  const friendId = userOne_id === session?.user?.id ? userTwo_id : userOne_id;

  const { chatMessages, infiniteRef, inputVal, onChange, onSubmit } = useChat({
    chatRoomId: chatRoomData.id,
    friendId,
  });

  const { name, username } = useUser({ userId: friendId });

  useEffect(() => {
    if (bottomRef.current && !chatMessages.isLoading) {
      bottomRef.current.scrollIntoView();
    }
  }, [chatMessages.isLoading]);

  if (chatMessages.isLoading || !chatMessages.data) {
    return <LoadingHeading headingText="loading" />;
  }

  return (
    <section className={styles.chat}>
      <header className={styles.header}>
        <Button type="button" onClick={() => router.push('/chat')}>
          <IconArrowLeft />
        </Button>
        <Avatar userId={friendId} />
        <Heading tag="h2" className={styles.heading}>
          {name && `${name},`} @{username}
        </Heading>
      </header>

      <ul className={styles.messages}>
        {chatMessages.data.pages.map((page) => {
          return page.messages.map((message) => {
            return <ChatMessage message={message} key={message.id} />;
          });
        })}
        {(chatMessages.hasNextPage || chatMessages.isLoading) && (
          <li ref={infiniteRef} className={styles.loading}>
            <IconLoader2 />
            <VisuallyHiddenText text="Loading older messages" />
          </li>
        )}
      </ul>
      <div ref={bottomRef} />
      <motion.form
        initial={{ y: 0 }}
        animate={
          isGoingUp && isMobile
            ? {
                y: '-2.5rem',
                transition: {
                  type: 'keyframes',
                  delay: 0.05,
                },
              }
            : { y: 0 }
        }
        className={styles.form}
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Write something.."
          className={styles.input}
          value={inputVal}
          onChange={onChange}
        />
        <button type="submit" className={styles.button} disabled={inputVal.trim() === ''}>
          <IconSend />
          <VisuallyHiddenText text="send" />
        </button>
      </motion.form>
    </section>
  );
};
