import { motion } from 'framer-motion';

import { usePostButtonsData } from '@/src/components/post/post-buttons/use-post-buttons';
import { PostModal } from '@/src/components/post/post-modal/post-modal';

import styles from './post-buttons.module.scss';

type Props = {
  postId: number;
  parentModalOpen?: boolean;
};

export const PostButtons = ({ postId, parentModalOpen }: Props) => {
  const { buttonData, postModal } = usePostButtonsData({
    postId,
    parentModalOpen,
  });

  return (
    <ul className={styles.list}>
      {buttonData.map(({ alt, icon, onClick, count }) => {
        return (
          <li key={alt} className={styles.listItem}>
            <motion.button
              className={styles.button}
              type="button"
              onClick={onClick}
            >
              {icon}
              <span className="visually-hidden">{alt}</span>
              <span className={styles.buttonCount}>{count}</span>
            </motion.button>
          </li>
        );
      })}

      <PostModal
        isVisible={postModal.isModalOpen}
        postId={postId}
        closeModal={postModal.closeModal}
      />
    </ul>
  );
};
