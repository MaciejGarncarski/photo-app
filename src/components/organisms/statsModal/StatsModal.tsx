import { motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useFollowers } from '@/src/hooks/useFollowers';

import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';

import { ModalCloseButton } from '@/src/components/molecules/modalCloseButton/ModalCloseButton';

import styles from './statsModal.module.scss';

import { StatsModalItem } from '../statsModalItem/StatsModalItem';

type PropsTypes = {
  userId: string;
  type: 'following' | 'followers';
  modal: {
    closeModal: () => void;
    openModal: () => void;
    isModalOpen: boolean;
  };
};

export const StatsModal = ({ modal, type, userId }: PropsTypes) => {
  const { closeModal } = modal;
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
    <ModalBackdrop closeModal={closeModal}>
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100, opacity: 0 }} className={styles.container}>
        <h3 className={styles.heading}>{type.toUpperCase()}</h3>
        <ReactFocusLock>
          <ModalCloseButton onClose={closeModal} />
          {isEmpty && (
            <ul className={styles.list}>
              <li className={styles.listItem}>No data.</li>
            </ul>
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
                  return <StatsModalItem user={user} key={user.id} />;
                });
              })}
            </ul>
          )}
        </ReactFocusLock>
      </motion.div>
    </ModalBackdrop>
  );
};
