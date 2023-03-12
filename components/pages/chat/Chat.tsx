import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import { Heading } from '@/components/atoms/heading/Heading';
import { Loader } from '@/components/atoms/loader/Loader';
import { ChatUsersList } from '@/components/organisms/chatUsersList/ChatUsersList';
import { SearchUserForm } from '@/components/organisms/searchUserForm/SearchUserForm';
import { useChatUsers } from '@/components/pages/chat/useChatUsers';

import styles from './chat.module.scss';

export const Chat = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const debouncedInputVal = useDebounce(inputVal, 1000);
  const { data, isLoading, hasNextPage, infiniteRef } = useChatUsers({ searchedUser: debouncedInputVal });

  return (
    <section className={styles.container}>
      <Heading tag="h2" className={styles.heading}>
        Select other user.
      </Heading>
      <SearchUserForm inputVal={inputVal} setInputVal={setInputVal} />
      <nav className={styles.nav}>
        <ChatUsersList data={data} isLoading={isLoading} />
        {hasNextPage && (
          <li ref={infiniteRef}>
            <Loader />
          </li>
        )}
      </nav>
    </section>
  );
};
