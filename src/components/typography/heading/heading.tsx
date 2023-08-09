import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import styles from './Heading.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Sizes = 'small' | 'medium' | 'big';

type PropsTypes = {
  tag: HeadingTag;
  children: ReactNode;
  size: Sizes;
};

type MotionTag = {
  children: ReactNode;
  className: string;
};

export const Heading = ({
  children,
  size,
  tag: Tag = 'h2',
  ...rest
}: PropsTypes) => {
  const MotionTag = motion<MotionTag>(Tag);

  return (
    <MotionTag className={clsx(styles[size], styles.heading)} {...rest}>
      {children}
    </MotionTag>
  );
};
