import { AnimatePresence, motion } from 'framer-motion';

import { useListData } from '@/components/molecules/accountStats/useListData';

import styles from './accountStats.module.scss';

import { StatsModal } from '../../organisms/statsModal/StatsModal';

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
        {followingModal.modalOpen && <StatsModal type="following" modal={followingModal} userId={userId} />}
        {followersModal.modalOpen && <StatsModal type="followers" modal={followersModal} userId={userId} />}
      </AnimatePresence>
    </>
  );
};
