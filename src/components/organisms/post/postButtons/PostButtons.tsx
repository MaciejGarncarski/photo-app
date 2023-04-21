import { motion } from 'framer-motion';

import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { usePostButtonsData } from '@/src/components/organisms/post/postButtons/usePostButtonsData';
import { PostModal } from '@/src/components/organisms/postModal/PostModal';
import { ShareModal } from '@/src/components/organisms/shareModal/ShareModal';

import { Post } from '@/src/schemas/post.schema';

import styles from './PostButtons.module.scss';

type PropsTypes = {
  post: Post;
  parentModalOpen?: boolean;
};

export const PostButtons = ({ post, parentModalOpen }: PropsTypes) => {
  const { id } = post;
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
        isVisible={shareModal.isModalOpen}
        closeModal={shareModal.closeModal}
        textToCopy={`https://photo-app-orpin.vercel.app/post/${id}`}
      />
      <PostModal isVisible={postModal.isModalOpen} post={post} closeModal={postModal.closeModal} />
    </ul>
  );
};
