import { AnimatePresence, motion } from 'framer-motion';

import { useListData } from '@/src/components/organisms/accountStats/useListData';
import { StatsModal } from '@/src/components/organisms/statsModal/StatsModal';

import styles from './AccountStats.module.scss';

type PropsTypes = {
  userId: string;
};

export const AccountStats = ({ userId }: PropsTypes) => {
  const { followersModal, friendsModal, listData } = useListData({ userId });

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
        {friendsModal.isModalOpen && <StatsModal type="friends" closeModal={friendsModal.closeModal} userId={userId} />}
        {followersModal.isModalOpen && (
          <StatsModal type="followers" closeModal={followersModal.closeModal} userId={userId} />
        )}
      </AnimatePresence>
    </>
  );
};
