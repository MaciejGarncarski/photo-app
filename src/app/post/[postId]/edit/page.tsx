import { EditPost } from '@/src/components/pages/edit-post/edit-post';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

const EditPostPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <EditPost />
    </ProtectedPage>
  );
};

export default EditPostPage;
