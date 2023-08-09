import { CreatePost } from '@/src/components/pages/createPost/CreatePost';
import { ProtectedPage } from '@/src/components/pages/protected-page/ProtectedPage';

const CreatePostPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <CreatePost />
    </ProtectedPage>
  );
};

export default CreatePostPage;
