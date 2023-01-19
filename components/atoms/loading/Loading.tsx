import clsx from 'clsx';

import styles from './loading.module.scss';

type LoadingVariants = 'small' | 'very-small' | 'left' | 'center' | 'no-margin';

type LoadingProps = {
  variants?: Array<LoadingVariants>;
};

export const Loading = ({ variants }: LoadingProps) => {
  const variantClassName = variants?.map((variant) => styles[variant]);

  return (
    <div className={clsx(variantClassName, styles.container)}>
      <span className="visually-hidden">loading</span>
    </div>
  );
};
