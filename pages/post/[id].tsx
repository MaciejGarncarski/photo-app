import { useRouter } from 'next/router';
import { z } from 'zod';

import { Loading } from '@/components/atoms/loading/Loading';

const postIdSchema = z.object({
  id: z.string(),
});

const PostPage = () => {
  const router = useRouter();

  if (!router.isReady) {
    return <Loading />;
  }
  const query = postIdSchema.parse(router.query);

  return <p>post {query?.id}</p>;
};

export default PostPage;
