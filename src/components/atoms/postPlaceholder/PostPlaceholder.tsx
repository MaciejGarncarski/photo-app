import { motion } from 'framer-motion';

import { PostHeaderPlaceholder } from '@/src/components/atoms/postHeaderPlaceholder/PostHeaderPlaceholder';

import styles from './PostPlaceholder.module.scss';

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
