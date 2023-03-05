import { ChatRoom } from '@prisma/client';
import { IconSend } from '@tabler/icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
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
import { useChatSubscription } from '@/components/pages/chat/useChatSubscription';

import styles from './chat.module.scss';

import { useChatMessages } from './useChatMessages';

const socket = io(clientEnv.NEXT_PUBLIC_WS_URL, { transports: ['websocket'] });

type PropsTypes = {
  chatRoomData: ChatRoom;
};

export const Chat = ({ chatRoomData }: PropsTypes) => {
  const [inputVal, setInputVal] = useState<string>('');
  const { session } = useAuth();

  const { userOne_id, userTwo_id } = chatRoomData;
  const friendId = userOne_id === session?.user?.id ? userTwo_id : userOne_id;

  const { username, name } = useUser({ userId: friendId });

  useChatSubscription(socket);

  const addMessage = useMutation(async () => {
    await axios.post('/api/chat/addMessage', {
      text: inputVal,
      userId: session?.user?.id,
      friendId,
    });
  });

  const chatMessages = useChatMessages({ friendId, userId: session?.user?.id ?? '' });

  const [infiniteRef] = useInfiniteScroll({
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    // socket.emit('typing', { receiver: friendId, sender: session?.user?.id });
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

      <ul className={styles.messages}>
        {chatMessages.data.pages.map((page) => {
          return page.messages.map((message) => {
            return <ChatMessage message={message} key={message.id} />;
          });
        })}

        {chatMessages.hasNextPage && (
          <li ref={infiniteRef} className={styles.loading}>
            <div role="status">
              <VisuallyHiddenText text="Loading older messages" />
            </div>
          </li>
        )}
      </ul>

      <form className={styles.form} onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Write something.."
          className={styles.input}
          value={inputVal}
          onChange={onChange}
        />
        <button type="submit" className={styles.button} disabled={addMessage.isLoading || inputVal.trim() === ''}>
          <IconSend />
          <VisuallyHiddenText text="send" />
        </button>
      </form>
    </section>
  );
};
