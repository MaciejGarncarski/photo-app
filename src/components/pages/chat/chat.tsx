'use client';

import { ChatUsersList } from '@/src/components/chat-users-list/chat-users-list';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './chat.module.scss';

export const Chat = () => {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <Heading tag="h2" size="big">
          Messages
        </Heading>
      </div>
      <ChatUsersList />
    </section>
  );
};
