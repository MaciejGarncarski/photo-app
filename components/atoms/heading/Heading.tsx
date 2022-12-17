import clsx from 'clsx';

import styles from './heading.module.scss';

import { Children } from '@/components/Layout/Layout';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = Children & {
  tag: HeadingTag;
  className?: string;
};

export const Heading = ({ children, tag: Tag = 'h2', className }: HeadingProps) => {
  return <Tag className={clsx(className, styles.heading)}>{children}</Tag>;
};
