import { motion } from 'framer-motion';

import styles from './postPlaceholder.module.scss';

export const PostPlaceholder = () => {
  return (
    <motion.div role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.placeholder}>
      <div className={styles.header}>
        <div className={styles.avatar}></div>
        <div className={styles.username}></div>
      </div>

      <div className={styles.image}></div>

      <div className={styles.footer}></div>
    </motion.div>
  );
};
