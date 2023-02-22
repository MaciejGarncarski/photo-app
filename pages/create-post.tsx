import { useAuth } from '@/hooks/useAuth';

import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { CreatePost } from '@/components/pages/createPost/CreatePost';

const CreatePostPage = () => {
  const { status } = useAuth();

  if (status === 'loading') {
    return null;
  }

  if (status === 'unauthenticated') {
    return <AccessDenied />;
  }

  return <CreatePost />;
};

export default CreatePostPage;
