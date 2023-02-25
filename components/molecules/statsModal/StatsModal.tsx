import { User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactFocusLock from 'react-focus-lock';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { Backdrop } from '@/components/atoms/modal/Backdrop';
import { ModalClose } from '@/components/atoms/modal/ModalClose';

import styles from './statsModal.module.scss';

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

export const USERS_PER_SCROLL = 6;

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
    <Backdrop close={close}>
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100, opacity: 0 }} className={styles.container}>
        <h3 className={styles.heading}>{type.toUpperCase()}</h3>
        <ReactFocusLock>
          <ModalClose onClose={close} />
          {isLoading ? (
            <ul className={styles.list} ref={sentryRef}>
              {Array.from({ length: USERS_PER_SCROLL }, (_, item) => item).map((el) => {
                return <li className={styles.placeholder} key={el}></li>;
              })}
            </ul>
          ) : (
            <ul className={styles.list}>
              {data?.pages.map((page) => {
                return page.users.map(({ id, username }) => {
                  return (
                    <li key={id} className={styles.listItem}>
                      <Link href={`/${username}`} className={styles.itemLink} onClick={close}>
                        <Avatar userId={id} />
                        <span className={styles.username}>@{username}</span>
                      </Link>
                      <FollowButton userId={id} />
                    </li>
                  );
                });
              })}
            </ul>
          )}
        </ReactFocusLock>
      </motion.div>
    </Backdrop>
  );
};
