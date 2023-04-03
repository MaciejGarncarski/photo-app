import { AnimatePresence, motion } from 'framer-motion';

import { useListData } from '@/src/components/organisms/accountStats/useListData';
import { StatsModal } from '@/src/components/organisms/statsModal/StatsModal';

import styles from './accountStats.module.scss';

type PropsTypes = {
  userId: string;
};

export const AccountStats = ({ userId }: PropsTypes) => {
  const { followersModal, followingModal, listData } = useListData({ userId });

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
        {followingModal.isModalOpen && <StatsModal type="following" modal={followingModal} userId={userId} />}
        {followersModal.isModalOpen && <StatsModal type="followers" modal={followersModal} userId={userId} />}
      </AnimatePresence>
    </>
  );
};
