import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import { string } from '@/utils/string';

import { EditPost } from '@/components/pages/editPost/EditPost';

const EditPostPage = () => {
  const router = useRouter();
  const { status } = useAuth();

  if (status === 'loading') {
    return null;
  }

  return <EditPost postId={Number(string(router.query.id))} />;
};

export default EditPostPage;
