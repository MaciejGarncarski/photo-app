import { ArrowUp } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';

import { notificationVariant } from '@/components/new-post-notification/new-post-notification.animation';
import { useNewPost } from '@/components/new-post-notification/use-post-notification';

import styles from './new-post-notification.module.scss';

export const NewPostNotification = () => {
  const { hasNewPosts, handleRefetchPosts } = useNewPost();

  return (
    <AnimatePresence>
      {hasNewPosts && (
        <motion.button
          type="button"
          className={styles.notification}
          variants={notificationVariant}
          initial="hidden"
          exit="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={handleRefetchPosts}
        >
          <ArrowUp size={20} />
          New posts
        </motion.button>
      )}
    </AnimatePresence>
  );
};
