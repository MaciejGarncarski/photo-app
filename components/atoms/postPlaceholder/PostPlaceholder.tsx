import clsx from 'clsx';

import styles from './postPlaceholder.module.scss';

type Sizes = 'small' | 'normal';

export const PostPlaceholder = ({ size }: { size?: Sizes }) => {
  return <div role="status" className={clsx(size && styles[size], styles.placeholder)}></div>;
};
