import { useRouter } from 'next/router';

import { string } from '@/utils/string';

import { Account } from '@/components/pages/account/Account';
import { usePost } from '@/components/pages/account/usePost';

const PostPage = () => {
  const router = useRouter();
  const { data } = usePost({ postId: Number(string(router.query.id)) });

  if (!router.isReady) {
    return <Account isModalOpen username={data?.author.username ?? ''} />;
  }

  return <Account isModalOpen username={data?.author.username ?? ''} postId={Number(string(router.query.id))} />;
};

export default PostPage;
