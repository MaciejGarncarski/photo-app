import clsx from 'clsx';
import { motion } from 'framer-motion';

import styles from './postPlaceholder.module.scss';

type Sizes = 'small' | 'normal';

export const PostPlaceholder = ({ size }: { size?: Sizes }) => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      role="status"
      className={clsx(size && styles[size], styles.placeholder)}
    ></motion.div>
  );
};
