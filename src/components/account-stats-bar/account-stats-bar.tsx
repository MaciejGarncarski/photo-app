import { AnimatePresence, motion } from 'framer-motion';

import { useUserStats } from '@/src/components/account-stats-bar/use-user-stats';
import { StatsModal } from '@/src/components/modals/stats-modal/stats-modal';

import styles from './account-stats-bar.module.scss';

type PropsTypes = {
  userId: string;
};

export const AccountStats = ({ userId }: PropsTypes) => {
  const { followersModal, friendsModal, listData } = useUserStats({ userId });

  return (
    <>
      <motion.ul className={styles.list}>
        {listData.map(({ onClick, title, count }) => {
          return (
            <li className={styles.listItem} key={title}>
              <button type="button" className={styles.button} onClick={onClick}>
                <span className={styles.listItemNumber}>{count}</span>
                <span className={styles.listItemText}>{title}</span>
              </button>
            </li>
          );
        })}
      </motion.ul>
      <AnimatePresence>
        {friendsModal.isModalOpen && (
          <StatsModal
            type="friends"
            closeModal={friendsModal.closeModal}
            userId={userId}
          />
        )}
        {followersModal.isModalOpen && (
          <StatsModal
            type="followers"
            closeModal={followersModal.closeModal}
            userId={userId}
          />
        )}
      </AnimatePresence>
    </>
  );
};
