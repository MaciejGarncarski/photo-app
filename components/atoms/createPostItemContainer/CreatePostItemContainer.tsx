import styles from './createPostItemContainer.module.scss';

import { Children } from '@/components/Layout/Layout';

export const CreatePostItemContainer = ({ children }: Children) => {
  return <section className={styles.container}>{children}</section>;
};
