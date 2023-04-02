import { motion } from 'framer-motion';

import { PostData } from '@/src/utils/apis/transformPost';

import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';
import { usePostButtonsData } from '@/src/components/molecules/post/postButtons/usePostButtonsData';
import { PostModal } from '@/src/components/organisms/postModal/PostModal';
import { ShareModal } from '@/src/components/organisms/shareModal/ShareModal';

import styles from './postButtons.module.scss';

type PropsTypes = {
  post: PostData;
  parentModalOpen?: boolean;
};

export const PostButtons = ({ post, parentModalOpen }: PropsTypes) => {
  const { postId } = post;
  const { buttonData, postModal, shareModal } = usePostButtonsData({ post, parentModalOpen });

  return (
    <ul className={styles.list}>
      {buttonData.map(({ alt, icon, onClick, count }) => {
        return (
          <li key={alt} className={styles.listItem}>
            <motion.button
              className={styles.button}
              type="button"
              onClick={onClick}
              whileTap={{ scale: 0.8, transition: { type: 'tween', duration: 0.1 } }}
            >
              {icon}
              <VisuallyHidden>{alt}</VisuallyHidden>
              <span className={styles.buttonCount}>{count}</span>
            </motion.button>
          </li>
        );
      })}

      <ShareModal
        isVisible={shareModal.modalOpen}
        close={shareModal.close}
        textToCopy={`https://photo-app-orpin.vercel.app/post/${postId}`}
      />
      <PostModal isVisible={postModal.modalOpen} post={post} close={postModal.close} />
    </ul>
  );
};
