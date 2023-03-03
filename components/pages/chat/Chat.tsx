import { IconSend } from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { FormEvent, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';
import { useFollowers } from '@/hooks/useFollowers';
import { useUser } from '@/hooks/useUser';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Heading } from '@/components/atoms/heading/Heading';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './chat.module.scss';

import { useChatMessages } from './useChatMessages';

type PropsTypes = {
  friendId: string;
};

export const Chat = ({ friendId }: PropsTypes) => {
  const [inputVal, setInputVal] = useState<string>('');
  const { username, name } = useUser({ userId: friendId });
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const { data } = useFollowers({
    userId: session?.user?.id ?? '',
    type: 'followers',
  });

  const addMessage = useMutation(async () => {
    await axios.post('/api/chat/addMessage', {
      text: inputVal,
      userId: session?.user?.id,
      friendId,
    });
  });

  const chatMessages = useChatMessages({ friendId, userId: session?.user?.id ?? '' });

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    addMessage.mutate();
    setInputVal('');
    queryClient.invalidateQueries(['chat', session?.user?.id, friendId]);
  };

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: chatMessages.isLoading,
    hasNextPage: chatMessages.hasNextPage || false,
    onLoadMore: chatMessages.fetchNextPage,
    disabled: !chatMessages.hasNextPage,
    rootMargin: '200px 0px 0px 0px',
  });

  console.log(chatMessages.data?.pages);

  if (!chatMessages.data) {
    return <Heading tag="h2">Loading..</Heading>;
  }

  return (
    <section className={styles.chat}>
      <header className={styles.header}>
        <Avatar userId={friendId} />
        <Heading tag="h2">
          {name}, @{username}
        </Heading>
      </header>

      <ul className={styles.messages} ref={rootRef}>
        {chatMessages.data.pages.map((page) => {
          return page.messages.map(({ id, sender, text }) => {
            return (
              <li className={clsx(sender !== session?.user?.id && styles.messageFriend, styles.message)} key={id}>
                <Avatar userId={sender} />
                <p>{text}</p>
              </li>
            );
          });
        })}

        {chatMessages.hasNextPage && (
          <li ref={infiniteRef} className={styles.loading}>
            <p>loading...</p>
          </li>
        )}
      </ul>

      <form className={styles.form} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Write something.."
          className={styles.input}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button type="submit" className={styles.button} disabled={addMessage.isLoading}>
          <IconSend />
          <VisuallyHiddenText text="send" />
        </button>
      </form>
    </section>
  );
};
