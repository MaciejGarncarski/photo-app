import clsx from 'clsx';

import styles from './heading.module.scss';

import { Children } from '@/components/Layout/Layout';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingVariants = 'center';

type HeadingProps = Children & {
  tag: HeadingTag;
  className?: string;
  variant?: HeadingVariants;
};

export const Heading = ({ children, variant, tag: Tag = 'h2', className }: HeadingProps) => {
  return <Tag className={clsx(variant && styles[variant], className, styles.heading)}>{children}</Tag>;
};
