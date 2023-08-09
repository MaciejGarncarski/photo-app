import { motion } from 'framer-motion';

import { PostHeaderPlaceholder } from '@/src/components/post/post-header-placeholder/post-header-placeholder';

import styles from './post-placeholder.module.scss';

export const PostPlaceholder = () => {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.placeholder}
    >
      <PostHeaderPlaceholder />

      <div className={styles.image}></div>

      <div className={styles.footer}></div>
    </motion.div>
  );
};
