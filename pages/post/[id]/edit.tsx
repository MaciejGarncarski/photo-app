import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { usePost } from '@/components/pages/account/usePost';
import { EditPost } from '@/components/pages/editPost/EditPost';

const EditPostPage = () => {
  const router = useRouter();
  const postId = parseInt(router.query.id as string);
  const { data, isLoading: isDataLoading } = usePost({ postId });
  const { isLoading, isAuthenticated, sessionUserData } = useAuth();

  if (isDataLoading || isLoading) {
    return <Loader variant="margin-top" />;
  }

  if (!isAuthenticated || data?.authorId !== sessionUserData.id) {
    return <AccessDenied />;
  }

  return <EditPost postId={postId} />;
};

export default EditPostPage;
