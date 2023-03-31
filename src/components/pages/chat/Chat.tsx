import { Heading } from '@/components/atoms/heading/Heading';
import { ChatUsersList } from '@/components/organisms/chatUsersList/ChatUsersList';
import { SearchUserForm } from '@/components/organisms/searchUserForm/SearchUserForm';
import { useChatUsers } from '@/components/pages/chat/useChatUsers';

import styles from './chat.module.scss';

export const Chat = () => {
  const { chatUsers, inputVal, setInputVal, isEnabled, setIsEnabled, setSearchedUser } = useChatUsers();

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <Heading tag="h2" size="big">
          Select other user.
        </Heading>
      </div>
      <SearchUserForm
        inputVal={inputVal}
        setInputVal={setInputVal}
        setIsEnabled={setIsEnabled}
        setSearchedUser={setSearchedUser}
      />
      <ChatUsersList chatUsers={chatUsers} isEnabled={isEnabled} />
    </section>
  );
};
