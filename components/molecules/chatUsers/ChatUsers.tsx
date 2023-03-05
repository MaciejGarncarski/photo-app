import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';
import { useFollowers } from '@/hooks/useFollowers';
import { string } from '@/utils/string';

import { Avatar } from '@/components/atoms/avatar/Avatar';

import styles from './chatUsers.module.scss';

export const ChatUsers = () => {
  const { session } = useAuth();
  const router = useRouter();

  const { data, isLoading, hasNextPage, fetchNextPage } = useFollowers({
    userId: session?.user?.id || '',
    type: 'following',
  });

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: !hasNextPage,
    rootMargin: '300px 0px 0px 0px',
  });

  if (!data || isLoading) {
    return null;
  }

  return (
    <nav ref={rootRef} className={styles.nav}>
      {data.pages.map((page) => {
        return page.users.map(({ user, chatRoomId }) => {
          const isActive = chatRoomId === Number(string(router.query.chatRoom));
          return (
            <Link
              key={user.id}
              href={`/chat/${chatRoomId}`}
              className={clsx(isActive && styles.linkActive, styles.link)}
            >
              <Avatar userId={user.id} />
              <p className={styles.username}>@{user.username}</p>
            </Link>
          );
        });
      })}
      {hasNextPage || (isLoading && <li ref={infiniteRef}>loading</li>)}
    </nav>
  );
};
