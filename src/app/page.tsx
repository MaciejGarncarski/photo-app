import { Suspense } from 'react';

import { Home } from '@/src/components/pages/home/home';
import { PostPlaceholder } from '@/src/components/post/post-placeholder/post-placeholder';

import styles from '@/src/components/pages/home/home.module.scss';

const PostsPlaceholder = () => {
  return (
    <div className={styles.posts}>
      <PostPlaceholder />
      <PostPlaceholder />
      <PostPlaceholder />
      <PostPlaceholder />
    </div>
  );
};

const HomePage = () => {
  return (
    <Suspense fallback={<PostsPlaceholder />}>
      <Home />;
    </Suspense>
  );
};

export default HomePage;
