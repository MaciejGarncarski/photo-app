import clsx from 'clsx';

import { Children } from '@/components/layout/Layout';

import styles from './heading.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingVariants = 'center';

type PropsTypes = Children & {
  tag: HeadingTag;
  className?: string;
  variant?: HeadingVariants;
};

export const Heading = ({ children, variant, tag: Tag = 'h2', className }: PropsTypes) => {
  return <Tag className={clsx(variant && styles[variant], className, styles.heading)}>{children}</Tag>;
};
