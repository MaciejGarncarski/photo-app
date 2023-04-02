import { useAuth } from '@/src/hooks/useAuth';

import { AccessDenied } from '@/src/components/molecules/accessDenied/AccessDenied';
import { Loader } from '@/src/components/molecules/loader/Loader';
import { CreatePost } from '@/src/components/pages/createPost/CreatePost';

const CreatePostPage = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <Loader color="blue" size="normal" />;
  }

  if (!isAuthenticated) {
    return <AccessDenied />;
  }

  return <CreatePost />;
};

export default CreatePostPage;
