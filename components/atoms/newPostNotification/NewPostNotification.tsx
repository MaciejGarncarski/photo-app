import { IconArrowUp } from '@tabler/icons-react';
import { AnimatePresence, motion, Variants } from 'framer-motion';

import { useScrollPosition } from '@/hooks/useScrollPosition';

import { useNewPost } from '@/components/atoms/newPostNotification/useNewPost';

import styles from './newPostNotification.module.scss';

const notificationVariant: Variants = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
  tap: {
    scale: 0.9,
  },
  hover: {
    scale: 1.07,
  },
};

export const NewPostNotification = () => {
  const { hasNewPosts, handleRefetchPosts } = useNewPost();
  const { scrollPos } = useScrollPosition();

  return (
    <AnimatePresence>
      {hasNewPosts && scrollPos > 300 && (
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
          <IconArrowUp />
          new posts
        </motion.button>
      )}
    </AnimatePresence>
  );
};
