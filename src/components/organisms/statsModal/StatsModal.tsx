import { motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';

import { ModalCloseButton } from '@/src/components/molecules/modalCloseButton/ModalCloseButton';

import { useStatsModal } from '@/src/components/organisms/statsModal/useStatsModal';
import { StatsModalItem } from '@/src/components/organisms/statsModalItem/StatsModalItem';

import styles from './StatsModal.module.scss';

type PropsTypes = {
  userId: string;
  type: 'friends' | 'followers';
  closeModal: () => void;
};

export const StatsModal = ({ closeModal, type, userId }: PropsTypes) => {
  const { isLoading, data, isEmpty, sentryRef, hasNextPage } = useStatsModal({ userId, type });

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
