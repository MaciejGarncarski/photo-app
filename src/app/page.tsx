import { Suspense } from 'react';

import { Home } from '@/src/components/pages/home/home';
import { PostPlaceholder } from '@/src/components/post/post-placeholder/post-placeholder';

const PostsPlaceholder = () => {
  return (
    <>
      <PostPlaceholder />
      <PostPlaceholder />
      <PostPlaceholder />
      <PostPlaceholder />
    </>
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
