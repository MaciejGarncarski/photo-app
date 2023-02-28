import { IconSend } from '@tabler/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
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

  const scrollableRootRef = useRef<HTMLUListElement | null>(null);
  const lastScrollDistanceToBottomRef = useRef<number>();

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
    disabled: true,
    rootMargin: '400px 0px 0px 0px',
  });

  useEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [rootRef]);

  const rootRefSetter = useCallback(
    (node: HTMLUListElement) => {
      rootRef(node);
      if (scrollableRootRef.current) {
        scrollableRootRef.current = node;
      }
    },
    [rootRef],
  );

  const handleRootScroll = useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
    }
  }, []);

  if (chatMessages.isLoading || !chatMessages.data) {
    return <Heading tag="h2">Loading..</Heading>;
  }

  return (
    <section className={styles.chat}>
      <nav>
        <ul className={styles.users}>
          {data?.pages.map((page) => {
            return page.users.map(({ id }) => {
              return (
                <li className={styles.user} key={id}>
                  <Avatar userId={id} />
                </li>
              );
            });
          })}
        </ul>
      </nav>
      <div className={styles.middle}>
        <header className={styles.header}>
          <Avatar userId={friendId} />
          <Heading tag="h2">
            {name}, @{username}
          </Heading>
        </header>

        <ul className={styles.messages} ref={rootRefSetter} onScroll={handleRootScroll}>
          {chatMessages.hasNextPage && (
            <li ref={infiniteRef} className={styles.loading}>
              <p>loading...</p>
            </li>
          )}
          {chatMessages.data.pages.map((page) => {
            return page.messages.map(({ created_at, id, sender, text }) => {
              return (
                <li className={clsx(sender !== session?.user?.id && styles.messageFriend, styles.message)} key={id}>
                  <Avatar userId={sender} />
                  <p>{text}</p>
                </li>
              );
            });
          })}
        </ul>
      </div>

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
