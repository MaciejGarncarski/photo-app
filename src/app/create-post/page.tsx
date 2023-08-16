import { CreatePost } from '@/src/components/pages/create-post/create-post';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

const CreatePostPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <CreatePost />
    </ProtectedPage>
  );
};

export default CreatePostPage;
