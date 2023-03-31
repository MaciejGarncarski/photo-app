import { useAuth } from '@/hooks/useAuth';

import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { Loader } from '@/components/molecules/loader/Loader';
import { CreatePost } from '@/components/pages/createPost/CreatePost';

const CreatePostPage = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Loader variant="margin-top" />;
  }

  if (!isAuthenticated) {
    return <AccessDenied />;
  }

  return <CreatePost />;
};

export default CreatePostPage;
