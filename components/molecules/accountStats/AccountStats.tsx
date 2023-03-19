import { motion } from 'framer-motion';

import { useUser } from '@/hooks/useUser';

import { useListData } from '@/components/molecules/accountStats/useListData';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';

import styles from './accountStats.module.scss';

import { StatsModal } from '../../organisms/statsModal/StatsModal';

type PropsTypes = {
  userId: string;
};

export const AccountStats = ({ userId }: PropsTypes) => {
  const { followersModal, followingModal, listData } = useListData();
  const { count } = useUser({ userId });

  if (!count) {
    return null;
  }

  return (
    <>
      <motion.ul className={styles.list}>
        {listData.map(({ onClick, title }) => (
          <li className={styles.listItem} key={title}>
            <button type="button" className={styles.button} onClick={onClick}>
              <span className={styles.listItemNumber}>{count[title]}</span>
              <span className={styles.listItemText}>{title}</span>
            </button>
          </li>
        ))}
      </motion.ul>
      <ModalContainer>
        {followingModal.modalOpen && <StatsModal type="following" modal={followingModal} userId={userId} />}
        {followersModal.modalOpen && <StatsModal type="followers" modal={followersModal} userId={userId} />}
      </ModalContainer>
    </>
  );
};
