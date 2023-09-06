'use client';

import { ChatUsersList } from '@/src/components/chat-users-list/chat-users-list';
import { SearchUserForm } from '@/src/components/forms/search-user-form/search-user-form';
import { useChatUsers } from '@/src/components/pages/chat/use-chat-users';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './chat.module.scss';

export const Chat = () => {
  const { chatUsers, isEnabled, onChange, onSubmit, resetState, inputValue } =
    useChatUsers();

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <Heading tag="h2" size="big">
          Photo App Chat
        </Heading>
      </div>
      <SearchUserForm
        resetState={resetState}
        onChange={onChange}
        onSubmit={onSubmit}
        inputValue={inputValue}
      />
      <ChatUsersList chatUsers={chatUsers} isEnabled={isEnabled} />
    </section>
  );
};
