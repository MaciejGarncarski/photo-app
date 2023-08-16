import { PostHeaderPlaceholder } from '@/src/components/post/post-header-placeholder/post-header-placeholder';

import styles from './post-placeholder.module.scss';

export const PostPlaceholder = () => {
  return (
    <div role="status" className={styles.placeholder}>
      <PostHeaderPlaceholder />
      <div className={styles.image}></div>
      <div className={styles.footer}></div>
    </div>
  );
};
