import styles from './createPostItemContainer.module.scss';

import { Children } from '@/components/layout/Layout';

export const CreatePostItemContainer = ({ children }: Children) => {
  return <section className={styles.container}>{children}</section>;
};
