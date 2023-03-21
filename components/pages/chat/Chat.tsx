import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Heading } from '@/components/atoms/heading/Heading';
import { Loader } from '@/components/atoms/loader/Loader';
import { ChatUsersList } from '@/components/organisms/chatUsersList/ChatUsersList';
import { SearchUserForm } from '@/components/organisms/searchUserForm/SearchUserForm';
import { useChatUsers } from '@/components/pages/chat/useChatUsers';

import styles from './chat.module.scss';

export const Chat = () => {
  const { chatUsers, inputVal, setInputVal, isEnabled, setIsEnabled, setSearchedUser } = useChatUsers();
  const { data, isLoading, hasNextPage, fetchNextPage } = chatUsers;

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading && isEnabled,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: !hasNextPage,
    rootMargin: '0px 0px 500px 0px',
  });

  return (
    <section className={styles.container}>
      <Heading tag="h2" className={styles.heading}>
        Select other user.
      </Heading>
      <SearchUserForm
        inputVal={inputVal}
        setInputVal={setInputVal}
        setIsEnabled={setIsEnabled}
        setSearchedUser={setSearchedUser}
      />
      <nav className={styles.nav}>
        <ChatUsersList data={data} isLoading={isLoading} />
        {hasNextPage && (
          <div ref={infiniteRef}>
            <Loader />
          </div>
        )}
      </nav>
    </section>
  );
};
