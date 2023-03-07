import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactFocusLock from 'react-focus-lock';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useFollowers } from '@/hooks/useFollowers';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/buttons/followButton/FollowButton';
import { Backdrop } from '@/components/molecules/modal/Backdrop';
import { ModalClose } from '@/components/molecules/modal/ModalClose';

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

export const StatsModal = ({ modal, type, userId }: PropsTypes) => {
  const { close } = modal;
  const { data, hasNextPage, isLoading, fetchNextPage } = useFollowers({ userId, type });

  const isEmpty = data?.pages[0].users.length === 0;

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
          {isEmpty && (
            <p className={styles.list}>
              <span className={styles.listItem}>No data.</span>
            </p>
          )}
          {isLoading || hasNextPage ? (
            <ul className={styles.list} ref={sentryRef}>
              {Array.from({ length: 3 }, (_, item) => item).map((el) => {
                return <li className={styles.placeholder} key={el}></li>;
              })}
            </ul>
          ) : (
            <ul className={styles.list}>
              {data?.pages.map((page) => {
                return page.users.map(({ user }) => {
                  const { id, username } = user;

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
