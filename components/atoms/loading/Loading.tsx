import clsx from 'clsx';

import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './loading.module.scss';

type LoadingVariants = 'small' | 'very-small' | 'left' | 'center' | 'no-margin';

type PropsTypes = {
  className?: string;
  variants?: Array<LoadingVariants>;
};

export const Loading = ({ variants, className }: PropsTypes) => {
  const variantClassName = variants?.map((variant) => styles[variant]);

  return (
    <div data-testid="loading" className={clsx(className, variantClassName, styles.container)}>
      <VisuallyHiddenText text="loading" />
    </div>
  );
};
