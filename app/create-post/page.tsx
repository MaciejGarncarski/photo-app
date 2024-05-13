import { Metadata } from 'next';

import { getPageTitle } from '@/utils/get-page-title';

import { CreatePost } from '@/components/pages/create-post/create-post';
import { ProtectedPage } from '@/components/pages/protected-page/protected-page';

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
