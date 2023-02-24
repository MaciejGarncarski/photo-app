import { User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';

import styles from './accountStats.module.scss';

import { ListModal } from '../listModal/ListModal';

type PropsTypes = {
  userId: string;
  type: 'following' | 'followers';
  modal: {
    close: () => void;
    open: () => void;
    modalOpen: boolean;
  };
};

type StatsResponse = {
  users: Array<User>;
  usersCount: number;
  canLoadMore: boolean;
  nextCursor: number | null;
};

export const StatsModal = ({ modal, type, userId }: PropsTypes) => {
  const { close } = modal;

  const { data, hasNextPage, isLoading, fetchNextPage } = useInfiniteQuery(
    [type, userId],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get<StatsResponse>(
        `/api/getFollowers?userId=${userId}&type=${type}&skip=${pageParam ?? 0}`,
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevPosts) => {
        return prevPosts?.nextCursor ?? undefined;
      },
    },
  );

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: Boolean(hasNextPage),
    onLoadMore: fetchNextPage,
    disabled: true,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <ListModal headingText={type.toUpperCase()} close={close}>
      {data?.pages.map((page) => {
        return page.users.map(({ id, username }) => {
          return (
            <li key={id} className={styles.modalListItem}>
              <Link href={`/${username}`} className={styles.itemLink}>
                <Avatar />
                <span>{username}</span>
              </Link>
              <FollowButton userId={id} />
            </li>
          );
        });
      })}
    </ListModal>
  );
};
