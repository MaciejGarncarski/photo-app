import { ReactNode } from 'react';

import styles from './createPostItemContainer.module.scss';

type PropsTypes = {
  children: ReactNode;
};

export const CreatePostItemContainer = ({ children }: PropsTypes) => {
  return <section className={styles.container}>{children}</section>;
};
