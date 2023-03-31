import { AnimatePresence, motion } from 'framer-motion';

import { PostData } from '@/utils/apis/transformPost';

import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { usePostButtonsData } from '@/components/molecules/post/postButtons/usePostButtonsData';
import { PostModal } from '@/components/organisms/postModal/PostModal';
import { ShareModal } from '@/components/organisms/shareModal/ShareModal';

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
      <ModalContainer>
        {shareModal.modalOpen && (
          <ShareModal close={shareModal.close} textToCopy={`https://photo-app-orpin.vercel.app/post/${postId}`} />
        )}
      </ModalContainer>

      <AnimatePresence>
        {postModal.modalOpen && <PostModal modalOpen={postModal.modalOpen} post={post} close={postModal.close} />}
      </AnimatePresence>
    </ul>
  );
};
