import { useRouter } from 'next/router';

import { Account } from '@/src/components/pages/account/Account';

const PostPage = () => {
  const router = useRouter();
  const queryId = parseInt(router.query.id as string);

  return <Account isModalOpen postId={queryId} />;
};

export default PostPage;
