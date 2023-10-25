import { Metadata } from 'next';

import { getTitle } from '@/src/utils/get-title';

import { CreatePost } from '@/src/components/pages/create-post/create-post';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: getTitle('Create Post'),
};

const CreatePostPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <CreatePost />
    </ProtectedPage>
  );
};

export default CreatePostPage;
