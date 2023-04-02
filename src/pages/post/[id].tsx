import { useRouter } from 'next/router';

import { Account } from '@/src/components/pages/account/Account';
import { usePost } from '@/src/components/pages/account/usePost';

const PostPage = () => {
  const router = useRouter();
  const queryId = parseInt(router.query.id as string);
  const { data } = usePost({ postId: queryId });

  if (!router.isReady) {
    return <Account isModalOpen username={data?.author?.username ?? ''} />;
  }

  return <Account isModalOpen username={data?.author?.username ?? ''} postId={queryId} />;
};

export default PostPage;
