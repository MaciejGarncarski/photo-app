import { IconSend } from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import io from 'socket.io-client';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { clientEnv } from '@/utils/env.mjs';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { ChatMessage } from '@/components/atoms/chatMessage/ChatMessage';
import { Heading } from '@/components/atoms/heading/Heading';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { ChatUsers } from '@/components/molecules/chatUsers/ChatUsers';
import { useLoadingToast } from '@/components/pages/chat/useLoadingToast';

import styles from './chat.module.scss';

import { useChatMessages } from './useChatMessages';

type PropsTypes = {
  friendId: string;
};

const socket = io(clientEnv.NEXT_PUBLIC_WS_URL, { transports: ['websocket'] });

export const Chat = ({ friendId }: PropsTypes) => {
  const [inputVal, setInputVal] = useState<string>('');
  const { username, name } = useUser({ userId: friendId });
  const { session } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('new message', (data) => {
      const { receiver, sender } = data;
      queryClient.invalidateQueries(['chat', receiver, sender]);
      queryClient.invalidateQueries(['chat', sender, receiver]);
    });
  }, [queryClient, friendId, session?.user?.id]);

  const addMessage = useMutation(async () => {
    await axios.post('/api/chat/addMessage', {
      text: inputVal,
      userId: session?.user?.id,
      friendId,
    });
  });

  const chatMessages = useChatMessages({ friendId, userId: session?.user?.id ?? '' });
  useLoadingToast(socket);

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: chatMessages.isLoading,
    hasNextPage: chatMessages.hasNextPage || false,
    onLoadMore: chatMessages.fetchNextPage,
    disabled: !chatMessages.hasNextPage,
    rootMargin: '300px 0px 0px 0px',
  });

  if (!chatMessages.data || chatMessages.isLoading) {
    return <Heading tag="h2">Loading..</Heading>;
  }

  const message = {
    receiver: friendId,
    sender: session?.user?.id,
    message: inputVal,
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    socket.emit('send message', message);
    setInputVal('');
  };

  return (
    <section className={styles.chat}>
      <ChatUsers />

      <header className={styles.header}>
        <Avatar userId={friendId} />
        <Heading tag="h2" className={styles.heading}>
          {name}, @{username}
        </Heading>
      </header>

      <ul className={styles.messages} ref={rootRef}>
        {chatMessages.data.pages.map((page) => {
          return page.messages.map((message) => {
            return <ChatMessage message={message} key={message.id} />;
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
        <button type="submit" className={styles.button} disabled={addMessage.isLoading || inputVal.trim() === ''}>
          <IconSend />
          <VisuallyHiddenText text="send" />
        </button>
      </form>
    </section>
  );
};
