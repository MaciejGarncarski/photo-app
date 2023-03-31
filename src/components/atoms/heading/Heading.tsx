import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import styles from './heading.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type PropsTypes = {
  tag: HeadingTag;
  children: ReactNode;
};

type MotionTag = {
  children: ReactNode;
  className: string;
};

export const Heading = ({ children, tag: Tag = 'h2', ...rest }: PropsTypes) => {
  const MotionTag = motion<MotionTag>(Tag);

  return (
    <MotionTag className={styles.heading} {...rest}>
      {children}
    </MotionTag>
  );
};
