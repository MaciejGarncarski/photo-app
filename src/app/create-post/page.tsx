import { Metadata } from 'next';

import { setTitle } from '@/src/utils/set-title';

import { CreatePost } from '@/src/components/pages/create-post/create-post';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: setTitle('Create Post'),
};

const CreatePostPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <CreatePost />
    </ProtectedPage>
  );
};

export default CreatePostPage;
