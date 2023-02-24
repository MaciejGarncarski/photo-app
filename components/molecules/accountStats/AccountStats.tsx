import { motion } from 'framer-motion';

import { useUser } from '@/hooks/useUser';

import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';

import styles from './accountStats.module.scss';

import { StatsModal } from './StatsModal';

type Titles = 'posts' | 'followers' | 'following';

type ListData = Array<{ title: Titles; onClick: () => void }>;

type PropsTypes = {
  userId: string;
};

export const AccountStats = ({ userId }: PropsTypes) => {
  const followingModal = useModal();
  const followersModal = useModal();
  const { count } = useUser({ userId });

  const listData: ListData = [
    {
      title: 'posts',
      onClick: () => window.scrollBy({ top: 200, behavior: 'smooth' }),
    },
    {
      title: 'followers',
      onClick: followersModal.open,
    },
    {
      title: 'following',
      onClick: followingModal.open,
    },
  ];

  if (!count) {
    return null;
  }

  return (
    <>
      <motion.ul className={styles.list}>
        {listData.map(({ onClick, title }) => {
          return (
            <li className={styles.listItem} key={title}>
              <button type="button" className={styles.button} onClick={onClick}>
                <span className={styles.listItemNumber}>{count[title]}</span>
                <span className={styles.listItemText}>{title}</span>
              </button>
            </li>
          );
        })}
      </motion.ul>
      <ModalContainer>
        {followingModal.modalOpen && <StatsModal type="following" modal={followingModal} userId={userId} />}
        {followersModal.modalOpen && <StatsModal type="followers" modal={followersModal} userId={userId} />}
      </ModalContainer>
    </>
  );
};
