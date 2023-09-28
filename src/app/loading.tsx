import { PostPlaceholder } from '@/src/components/post/post-placeholder/post-placeholder';

import styles from '../components/pages/home/home.module.scss';

const HomePageLoading = () => {
  return (
    <ul className={styles.posts}>
      <li>
        <PostPlaceholder />
        <PostPlaceholder />
      </li>
    </ul>
  );
};

export default HomePageLoading;
