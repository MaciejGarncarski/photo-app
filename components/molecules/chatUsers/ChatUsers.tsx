import Link from 'next/link';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';
import { useFollowers } from '@/hooks/useFollowers';

import { Avatar } from '@/components/atoms/avatar/Avatar';

import styles from './chatUsers.module.scss';

export const ChatUsers = () => {
  const { session } = useAuth();
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
        return page.users.map(({ id, username }) => {
          return (
            <Link key={id} href={`/chat/${id}`} className={styles.link}>
              <Avatar userId={id} />
              <p className={styles.username}>@{username}</p>
            </Link>
          );
        });
      })}
    </nav>
  );
};
