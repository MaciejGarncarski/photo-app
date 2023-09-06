import { motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';
import { StatsModalItem } from '@/src/components/modals/stats-modal/stats-modal-item/stats-modal-item';
import { useStatsModal } from '@/src/components/modals/stats-modal/use-stats-modal';

import styles from './stats-modal.module.scss';

type Props = {
  userId: string;
  type: 'friends' | 'followers';
  closeModal: () => void;
};

export const StatsModal = ({ closeModal, type, userId }: Props) => {
  const { isLoading, data, isEmpty, ref } = useStatsModal({
    userId,
    type,
  });

  return (
    <ModalBackdrop closeModal={closeModal}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.container}
      >
        <ReactFocusLock autoFocus={false}>
          <div className={styles.header}>
            <h3 className={styles.heading}>{type.toUpperCase()}</h3>
            <ModalCloseButton onClose={closeModal} />
          </div>
          {isEmpty && (
            <ul className={styles.list}>
              <li className={styles.noData}>No data</li>
            </ul>
          )}
          {isLoading ? (
            <ul className={styles.list} ref={ref}>
              {Array.from({ length: 3 }, (_, item) => item).map((el) => {
                return <li className={styles.placeholder} key={el}></li>;
              })}
            </ul>
          ) : (
            <ul className={styles.list}>
              {data?.pages.map((page) => {
                return page.users.map((user) => {
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
