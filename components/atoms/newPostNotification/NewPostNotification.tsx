import { IconArrowUp } from '@tabler/icons';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useAtom } from 'jotai';

import { newPostsAtom } from '@/components/pages/home/Home';
import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/useInfinitePosts';

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
  const [hasNewPosts, setHasNewPosts] = useAtom(newPostsAtom);
  const queryClient = useQueryClient();

  const handleRefetchPosts = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
    setHasNewPosts(false);
  };

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
          <IconArrowUp />
          new posts
        </motion.button>
      )}
    </AnimatePresence>
  );
};
