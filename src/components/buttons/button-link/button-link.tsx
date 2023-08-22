import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

import { buttonVariants } from '@/src/components/buttons/button/button.animation';

import styles from './button-link.module.scss';

type Props = {
  href: string;
  children: ReactNode;
};

const MotionLink = motion(Link);

export const ButtonLink = ({ children, href }: Props) => {
  return (
    <MotionLink
      href={href}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className={styles.button}
    >
      {children}
    </MotionLink>
  );
};
