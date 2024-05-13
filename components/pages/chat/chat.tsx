'use client';

import { ChatText } from '@phosphor-icons/react';

import { ChatUsersList } from '@/components/chat-users-list/chat-users-list';
import { Heading } from '@/components/typography/heading/heading';

import styles from './chat.module.scss';

export const Chat = () => {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <ChatText size={48} />
        <Heading tag="h2" size="big">
          Chat
        </Heading>
      </div>
      <ChatUsersList />
    </section>
  );
};
