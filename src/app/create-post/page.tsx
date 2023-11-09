import { Metadata } from 'next';

import { getPageTitle } from '@/src/utils/get-page-title';

import { CreatePost } from '@/src/components/pages/create-post/create-post';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: getPageTitle('Create Post'),
};

const CreatePostPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <CreatePost />
    </ProtectedPage>
  );
};

export default CreatePostPage;
