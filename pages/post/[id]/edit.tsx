import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import { string } from '@/utils/string';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { usePost } from '@/components/pages/account/usePost';
import { EditPost } from '@/components/pages/editPost/EditPost';

const EditPostPage = () => {
  const router = useRouter();
  const postId = Number(string(router.query.id));
  const { data } = usePost({ postId });
  const { status, sessionUserData } = useAuth();

  if (status === 'loading') {
    return <Loader variant="margin-top" />;
  }

  if (status !== 'authenticated' || data?.authorId !== sessionUserData.id) {
    return <AccessDenied />;
  }

  return <EditPost postId={postId} />;
};

export default EditPostPage;
