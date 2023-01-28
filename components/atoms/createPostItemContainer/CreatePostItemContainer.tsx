import { Children } from '@/components/layout/Layout';

import styles from './createPostItemContainer.module.scss';

export const CreatePostItemContainer = ({ children }: Children) => {
  return <section className={styles.container}>{children}</section>;
};
