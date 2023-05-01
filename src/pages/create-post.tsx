import { AnimatedPage } from '@/src/components/pages/animatedPage/AnimatedPage';
import { CreatePost } from '@/src/components/pages/createPost/CreatePost';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

const CreatePostPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <AnimatedPage>
        <CreatePost />
      </AnimatedPage>
    </ProtectedPage>
  );
};

export default CreatePostPage;
