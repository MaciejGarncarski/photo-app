import { motion } from 'framer-motion';

import styles from './postPlaceholder.module.scss';

export const PostPlaceholder = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      role="status"
      className={styles.placeholder}
    ></motion.div>
  );
};
