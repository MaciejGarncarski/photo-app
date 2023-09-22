import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import styles from './auth-form.module.scss';

type Props = {
  children: ReactNode;
};

export const Error = ({ children }: Props) => {
  return (
    <motion.span
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className={styles.error}
    >
      {children}
    </motion.span>
  );
};
