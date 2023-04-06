import { Heading } from '@/src/components/atoms/heading/Heading';

import { SearchUserForm } from '@/src/components/molecules/searchUserForm/SearchUserForm';

import { ChatUsersList } from '@/src/components/organisms/chatUsersList/ChatUsersList';

import { useChatUsers } from '@/src/components/pages/chat/useChatUsers';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

import styles from './chat.module.scss';

export const Chat = () => {
  const { chatUsers, isEnabled, onChange, onSubmit, resetState, inputValue } = useChatUsers();

  return (
    <ProtectedPage shouldBeSignedIn>
      <section className={styles.container}>
        <div className={styles.heading}>
          <Heading tag="h2" size="big">
            Select other user.
          </Heading>
        </div>
        <SearchUserForm resetState={resetState} onChange={onChange} onSubmit={onSubmit} inputValue={inputValue} />
        <ChatUsersList chatUsers={chatUsers} isEnabled={isEnabled} />
      </section>
    </ProtectedPage>
  );
};
