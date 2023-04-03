import { useRouter } from 'next/router';

import { useAuth } from '@/src/hooks/useAuth';

import { AccessDenied } from '@/src/components/molecules/accessDenied/AccessDenied';
import { Loader } from '@/src/components/molecules/loader/Loader';

import { usePost } from '@/src/components/pages/account/usePost';
import { EditPost } from '@/src/components/pages/editPost/EditPost';

const EditPostPage = () => {
  const router = useRouter();
  const postId = parseInt(router.query.id as string);
  const { data, isLoading: isDataLoading } = usePost({ postId });
  const { isLoading, isAuthenticated, sessionUserData } = useAuth();

  if (isDataLoading || isLoading) {
    return <Loader color="blue" size="normal" />;
  }

  if (!isAuthenticated || data?.authorId !== sessionUserData.id) {
    return <AccessDenied />;
  }

  return <EditPost postId={postId} />;
};

export default EditPostPage;
