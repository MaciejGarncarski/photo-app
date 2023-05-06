import { CreatePost } from '@/src/components/pages/createPost/CreatePost';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

const CreatePostPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <CreatePost />
    </ProtectedPage>
  );
};

export default CreatePostPage;
