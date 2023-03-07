import { motion } from 'framer-motion';

import styles from './postPlaceholder.module.scss';

export const PostPlaceholder = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="status"
      className={styles.placeholder}
    ></motion.div>
  );
};
